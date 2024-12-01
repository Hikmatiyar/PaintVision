import { Component } from '@angular/core';
import { Job } from 'src/models/job';
import { JobService } from '../job-service/job.service';
import { Page } from '../navigator/page';
import { NavigatorService } from '../navigator/navigator.service';


@Component({
	selector: 'app-job-list',
	templateUrl: 'job-list.page.html',
	styleUrls: ['job-list.page.scss']
})
export class JobListPage {
	jobs: Job[];

	constructor(private jobService: JobService, private navigator: NavigatorService) {
		this.jobs = [];
	}

	ionViewWillEnter(): void {
		this.refresh();
		this.navigator.onAfterNavigate(Page.JobList);
	}

	ionViewWillLeave(): void {
		this.navigator.onBeforeNavigate(Page.JobList, null);
	}

	checkout(): void {
		this.navigator.navigateToPage(Page.OrderReview);
	}

	deleteJob(job: Job): void {
		this.jobService.deleteJob(job).subscribe(() => this.refresh());
	}

	refresh(event?: any): void {
		this.jobs = [];
		this.jobService.getJobs().subscribe(j => {
			this.jobs.push(...j);
			if (event) { event.target.complete(); }
		});
	}
}
