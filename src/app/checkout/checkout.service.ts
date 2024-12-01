import { Injectable } from '@angular/core';
import { Job } from 'src/models/job';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { INavigatorListener } from 'src/app/navigator/navigator.listener';
import { JobService } from 'src/app/job-service/job.service';
import { Page } from 'src/app/navigator/page';
import { DatabaseService } from '../database-service/database.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LocalStorageService } from '../localstorage-service/localstorage.service';
import { JobStatus } from 'src/models/jobstatus';
import { Order } from 'src/models/order';
import { Address } from 'src/models/address';

@Injectable({
	providedIn: 'root'
})
export class CheckoutService implements INavigatorListener {

	selectedJobs: Array<Job>;
	windowName: string;
	jobs: Array<Job>;
	orders: Array<Order>;
	order: Order;
	selectedAddress: Address;

	constructor(private navigator: NavigatorService, private jobService: JobService, private dbService: DatabaseService,
		private storageService: LocalStorageService) {
		this.selectedJobs = [];
		this.navigator.addListener(this);
	}

	ionViewWillEnter(): void {
		this.navigator.onAfterNavigate(Page.JobList);
	}

	ionViewWillLeave(): void {
		this.navigator.onBeforeNavigate(Page.JobList, null);
	}

	onBeforeNavigate(currentPage: Page, targetPage?: Page): void {
		if (currentPage === Page.EditJob && targetPage === Page.OrderReview) {
			this.selectedJobs = [this.jobService.active];
		}
	}

	onAfterNavigate(currentPage: Page): void { }

	saveJob(): Observable<Job> {
		const job = this.jobService.active;
		// id exists
		let observable: Observable<Job>;
		job.status = JobStatus.CheckedIn;
		if (job.id && job.id !== 0) {
			observable = this.dbService.updateJob(job);
		} else {
			observable = this.dbService.createJob(job);
		}

		return observable.pipe(
			retry(3),
			// too many tries to save to server,
			// save locally
			catchError(async err => {
				console.error(err);
				job.status = JobStatus.Local;
				await this.storageService.storeJob(job);
				return job;
			})
		);
	}

	addJob(job: Job): void {
		this.selectedJobs.push(job);
	}

	removeJob(job: Job): void {
		const index = this.selectedJobs.indexOf(job);
		if (index > -1) {
			this.selectedJobs.splice(index, 1);
		}
	}

	isJobSelected(job: Job): boolean {
		for (const j of this.selectedJobs) {
			if (job === j) {
				return true;
			}
		}
		return false;
	}

	createOrder(order: Order, userId: number): Observable<Order> {
		order.jobs.forEach(j => j.status = JobStatus.Ordered);
		this.selectedJobs = [];
		return this.dbService.createOrder(order, userId);
	}
}
