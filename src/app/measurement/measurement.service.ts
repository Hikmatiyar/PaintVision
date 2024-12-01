import { Injectable } from '@angular/core';
import { NavigatorService } from '../navigator/navigator.service';
import { Page } from '../navigator/page';
import { Window } from 'src/models/window';
import { MeasurementComponent } from './measurement.component';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database-service/database.service';
import { Observable } from 'rxjs';
import { retry, map, timeout, switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile-service/profile.service';

@Injectable({
	providedIn: 'root'
})
export class MeasurementService {

	window: Window;
	component: MeasurementComponent;

	constructor(private navigator: NavigatorService, private client: HttpClient, private profileService: ProfileService) { }

	openCamera(window: Window): void {
		this.window = window;
		if (this.component) {
			this.component.deconstruct();
			this.component.initialize();
		}

		this.navigator.navigateToPage(Page.Camera);
	}

	closeCamera(window: Window): void {
		this.window.height = window.height;
		this.window.width = window.width;
		this.component.deconstruct();
		this.navigator.navigateToPage(Page.EditJob);
	}

	// "exit without saving"
	exit(): void {
		this.component.deconstruct();
		this.navigator.navigateToPage(Page.EditJob);
	}

	getCorrectedImage(base64str: string, sensitivity: number = 100): Observable<any> {
		const url = `${DatabaseService.domain}/api/get-perspective`;

		return this.profileService.getUser().pipe(
			timeout(10000),
			switchMap((u) => {
				const body = { image: base64str, sensitivity, userId: u.id.toString() };
				return this.client.post<any>(url, body);
			}),
			map(v => {
				return {
					image: v.image,
					corners: v.corners
				};
			}),
			retry(2)
		);
	}

	getMeasurement(corners: Array<Array<number>>): Observable<Array<number>> {
		const url = `${DatabaseService.domain}/api/measure`;

		return this.profileService.getUser().pipe(
			timeout(10000),
			switchMap(u => {
				const body = { corners, userId: u.id.toString() };
				return this.client.post<any>(url, body);
			}),
			map(v => {
				return [
					v.measurement[0],
					v.measurement[1]
				];
			}),
			retry(2)
		);
	}
}
