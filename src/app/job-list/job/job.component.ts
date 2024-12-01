import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from 'src/models/job';
import { JobService } from 'src/app/job-service/job.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Page } from 'src/app/navigator/page';
import { AlertController } from '@ionic/angular';
import { Room } from 'src/models/room';
import { JobStatus } from 'src/models/jobstatus';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {

	@Input() job: Job;
	@Output() delete = new EventEmitter();
	expanded: boolean;
	active: Job;
	activeRoom: Room;

	constructor(private jobService: JobService, private checkoutService: CheckoutService,
		private navigatorService: NavigatorService, private alertController: AlertController,
		private profileService: ProfileService) {
		this.expanded = false;
	}

	ngOnInit(): void { }

	getJobPrice(): string {
		return this.job.getPrice(this.jobService.squareInchPrice).toFixed(2);
	}

	getJobStatus(): string {
		return JobStatus[this.job.status];
	}

	getRoomCount(): number {
		return this.job.rooms.length;
	}

	getWindowCount(): number {
		let count = 0;
		this.job.rooms.forEach((room) => count += room.windows.length);
		return count;
	}

	toggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	toggleSelected(): void {
		if (this.isSelected()) {
			this.checkoutService.removeJob(this.job);
		} else {
			this.checkoutService.addJob(this.job);
		}
	}

	isSelected(): boolean {
		return this.checkoutService.isJobSelected(this.job);
	}

	goToJobEdit(): void {
		this.profileService.getUnits().pipe(
			map(units => {
				if (units !== this.job.units) {
					this.job.convertUnits();
				}

				this.jobService.setActive(this.job);
				this.navigatorService.navigateToPage(Page.EditJob);
			})
		).subscribe();
	}

	async presentDeleteJobAlert(): Promise<void> {
		const alert = await this.alertController.create({
			header: 'Alert',
			message: 'Do you want to delete this job?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Delete',
					role: 'confirm',
					handler: () => this.delete.emit()
				}]
		});

		await alert.present();
	}
}
