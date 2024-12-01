import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MeasurementService } from './measurement.service';
import { Window } from 'src/models/window';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
	selector: 'app-measurement',
	templateUrl: './measurement.component.html',
	styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent {
	mode: string;
	uri: string;

	corners: Array<Array<number>>;
	selectedCorners: Array<Array<number>>;
	message: string;

	private cameraOptions: CameraOptions = {
		targetHeight: 4032,
		targetWidth: 2268,
		saveToPhotoAlbum: false,
		mediaType: 0,
		quality: 60,
		encodingType: 0,
		destinationType: 0
	};

	constructor(private camera: Camera, private measurementService: MeasurementService, private loading: LoadingController,
		private profileService: ProfileService) {
		this.initialize();
	}

	initialize(): void {
		this.measurementService.component = this;
		this.corners = [];
		this.selectedCorners = [];
		this.takePhoto();
	}

	deconstruct(): void {
		this.uri = null;
	}

	stop(): void {
		this.measurementService.exit();
	}

	async takePhoto(): Promise<void> {
		const value = await this.camera.getPicture(this.cameraOptions);
		const uri = 'data:image/jpeg;base64,' + value;
		await this.acceptPhoto(uri);
	}

	private async acceptPhoto(uri: string): Promise<void> {
		this.message = '';
		const loadingIndicator = await this.loading.create({
			message: 'Processing your photo, please wait...'
		});

		await loadingIndicator.present();

		this.getCorrectedImage(uri).subscribe(
			async value => {
				this.uri = 'data:image/jpeg;base64,' + value.image;
				const img = document.getElementById('img');
				const width = img.clientWidth;
				this.corners = value.corners.map((c: number[]) => {
					c[0] = c[0] * width / 1080;
					c[1] = c[1] * width / 1080;
					return c;
				});
				this.message = 'Now, select the four inside corners of the window.';
				await loadingIndicator.dismiss();
				this.selectedCorners = [];
			},
			async (err: HttpErrorResponse) => {
				this.message = 'The reference image was not found in your image!';
				await loadingIndicator.dismiss();
			}
		);
	}

	rejectPoints(): void {
		this.corners = [...this.corners, ...this.selectedCorners];
		this.selectedCorners = [];
	}

	rejectPhoto(): void {
		this.initialize();
	}

	selectCorner(corner: Array<number>): void {
		function exists(element: Array<number>): boolean {
			return element[0] === corner[0] && element[1] === corner[1];
		}

		if (this.selectedCorners.length === 4) {
			return;
		}

		// we don't want duplicate corners
		if (!this.selectedCorners.some(exists)) {
			const index = this.corners.indexOf(corner);
			this.corners.splice(index, 1);
			this.selectedCorners.push(corner);
		}

		if (this.selectedCorners.length === 4) {
			// enable button now
			this.message = 'Four corners selected. Press OK or Reset';
		}
	}

	async acceptCorners(): Promise<void> {
		this.message = '';
		const loadingIndicator = await this.loading.create({
			message: 'Measuring your window, please wait...'
		});

		await loadingIndicator.present();

		const img = document.getElementById('img');
		const width = img.clientWidth;
		const ratio = 1080 / width;
		let userUnits: string;
		this.profileService.getUnits().pipe(
			tap(units => userUnits = units),
			switchMap(() => this.measure())
		).subscribe(
			async measurement => {
				const window = new Window();
				window.width = (measurement[0] * ratio) - (1 / 16);
				window.height = (measurement[1] * ratio) - (1 / 16);

				if (userUnits === 'cm') {
					window.width *= 2.54;
					window.height *= 2.54;
				}

				// round to three decimals... the JS way
				window.width = Math.round(window.width * 1000) / 1000;
				window.height = Math.round(window.height * 1000) / 1000;

				await loadingIndicator.dismiss();
				this.measurementService.closeCamera(window);
			},
			async (err: HttpErrorResponse) => {
				await loadingIndicator.dismiss();
				this.message = 'There was an error measuring your window. Please try again in a moment.';
			}
		);
	}

	private getCorrectedImage(uri: string): Observable<any> {
		const [, ...tempuri] = uri.split(',');
		return this.measurementService.getCorrectedImage(tempuri.join(','));
	}

	private measure(): Observable<Array<number>> {
		return this.measurementService.getMeasurement(this.selectedCorners);
	}
}
