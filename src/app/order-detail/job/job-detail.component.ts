import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/models/job';
import { Window } from 'src/models/window';
import { JobService } from 'src/app/job-service/job.service';

@Component({
	selector: 'app-job-detail',
	templateUrl: './job-detail.component.html',
	styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {

	@Input() jobs: Job[];

	constructor(private jobService: JobService) { }

	ngOnInit(): void { }

	getJobCost(job: Job): string {
		return this.jobService.currencyIcon + job.getPrice(this.jobService.squareInchPrice).toFixed(2);
	}

	getWindowCost(job: Job, window: Window): string {
		const price = job.units === 'in' ? this.jobService.squareInchPrice : this.jobService.getSquareCmPrice();
		return this.jobService.currencyIcon + window.getPrice(price).toFixed(2);
	}
}
