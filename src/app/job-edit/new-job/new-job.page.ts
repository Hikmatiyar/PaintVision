import { Component } from '@angular/core';
import { JobService } from 'src/app/job-service/job.service';
import { Job } from 'src/models/job';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Page } from 'src/app/navigator/page';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-new-order',
	templateUrl: 'new-job.page.html',
	styleUrls: ['new-job.page.scss']
})
export class NewJobPage {

	jobName: string;
	job: Job;
	model = {
		jobName: null
	};

	constructor(private jobService: JobService, private navigator: NavigatorService, private profileService: ProfileService) {
		this.job = new Job();
	}

	ionViewWillEnter(): void {
		this.job = new Job();
		this.navigator.onAfterNavigate(Page.NewJob);
	}

	ionViewWillLeave(): void {
		this.navigator.onBeforeNavigate(Page.NewJob, null);
	}

	createNewJob(form: NgForm): void {
		this.profileService.getUser().pipe(
			switchMap(user => {
				this.job.ownerId = user.id;
				return this.profileService.getUnits();
			}),
			map(units => {
				this.job.units = units;
			})
		)
			.subscribe(() => {
				this.job.jobName = this.model.jobName.trim();
				this.jobService.setActive(this.job);
				this.navigator.navigateToPage(Page.EditJob);
				form.resetForm();
			});
	}
}
