import { Component, OnInit } from '@angular/core';
import { JobService } from '../job-service/job.service';
import { Job } from 'src/models/job';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-job-edit',
	templateUrl: './job-edit.page.html',
	styleUrls: ['./job-edit.page.scss'],
})
export class JobEditPage implements OnInit {

	jobService: JobService;
	canLeave: boolean;
	saved: boolean;
	camera: boolean;

	constructor(jobService: JobService, private alertCtrl: AlertController) {
		this.jobService = jobService;
	}

	ionViewWillEnter(): void {
		this.canLeave = false;
		this.saved = false;
	}

	async canDeactivate(): Promise<boolean> {
		if (this.saved || this.canLeave) {
			return true;
		}

		const confirmation = await this.cautionWindow();

		if (confirmation) {
			return true;
		} else {
			return false;
		}
	}

	onSaved(): void {
		this.saved = true;
	}

	onCameraEnter(): void {
		this.canLeave = true;
	}

	cautionWindow(): Promise<boolean> {
		return new Promise(async (resolve) => {
			const alert = await this.alertCtrl.create({
				header: 'Are you sure you want to leave this page?',
				message: 'Unsaved changes will be lost.',
				buttons: [{
					text: 'Cancel',
					handler: () => resolve(false)
				}, {
					text: 'Leave',
					handler: () => resolve(true)
				}]
			});

			await alert.present();
		});
	}

	ngOnInit(): void { }

	getRoomPrice(): number {
		return this.jobService.active.getPrice(this.jobService.squareInchPrice);
	}

	getJobPrice(): string {
		let result = 0;
		this.jobService.active.rooms.forEach(r => result += r.getPrice(this.jobService.squareInchPrice));
		return result.toFixed(2);
	}

	getActive(): Job {
		return this.jobService.active;
	}
}
