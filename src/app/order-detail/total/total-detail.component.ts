import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/models/job';
import { JobService } from 'src/app/job-service/job.service';

@Component({
	selector: 'app-total-detail',
	templateUrl: './total-detail.component.html',
	styleUrls: ['./total-detail.component.scss'],
})
export class TotalDetailComponent implements OnInit {

	@Input() jobs: Job[];

	constructor(private jobService: JobService) { }

	ngOnInit(): void { }

	getJobs(): Job[] {
		return this.jobs;
	}

	getJobCost(job: Job): string {
		return this.jobService.currencyIcon + job.getPrice(this.jobService.squareInchPrice).toFixed(2);
	}

	private totalJobCost(): number {
		let result = 0;
		this.jobs.forEach(j => result += j.getPrice(this.jobService.squareInchPrice));
		return result;
	}

	getTotalJobCost(): string {
		return this.jobService.currencyIcon + this.totalJobCost().toFixed(2);
	}

	getShippingCost(): string {
		return this.jobService.currencyIcon + this.jobService.getShippingCost().toFixed(2);
	}

	getTaxPercentage(): string {
		return `${this.jobService.taxDecimal * 100}%`;
	}

	private taxCost(): number {
		return (this.totalJobCost() + this.jobService.getShippingCost()) * this.jobService.taxDecimal;
	}

	getTaxCost(): string {
		return this.jobService.currencyIcon + this.taxCost().toFixed(2);
	}

	getTotalCost(): string {
		return this.jobService.currencyIcon + this.jobService.getTotalCost(this.getJobs()).toFixed(2);
	}
}
