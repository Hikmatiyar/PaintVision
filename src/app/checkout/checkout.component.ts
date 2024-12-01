import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Page } from 'src/app/navigator/page';
import { INavigatorListener } from '../navigator/navigator.listener';
import { JobService } from 'src/app/job-service/job.service';
import { CheckoutService } from './checkout.service';

@Component({
	selector: 'app-checkout',
	templateUrl: 'checkout.component.html',
	styleUrls: ['checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, INavigatorListener {

	@Input() roomPrice: number;
	@Output() saved = new EventEmitter();
	private page: Page;

	constructor(private navigator: NavigatorService, private jobService: JobService, private checkoutService: CheckoutService) {
		this.navigator.addListener(this);
	}

	ngOnInit(): void { }

	onBeforeNavigate(currentPage: Page, targetPage?: Page): void { }

	onAfterNavigate(currentPage: Page): void {
		this.page = currentPage;
	}

	isJobList(): boolean {
		return this.page === Page.JobList;
	}

	saveJob(): void {
		this.checkoutService.saveJob().subscribe(() => {
			this.saved.emit();
			this.navigator.navigateToPage(Page.JobList);
		});
	}

	getJobPrice(): string {
		return this.jobService.active.getPrice(this.jobService.squareInchPrice).toFixed(2);
	}

	getRoomPrice(): string {
		if (!this.roomPrice) { return '0'; }
		return this.roomPrice.toFixed(2);
	}

	getSelectedJobsPrice(): string {
		let result = 0;
		this.checkoutService.selectedJobs.forEach(j => result += j.getPrice(this.jobService.squareInchPrice));
		return result.toFixed(2);
	}

	goToSelectAddress(): void {
		this.navigator.navigateToPage(Page.SelectAddress);
	}

	goToOrderPage(): void {
		this.navigator.navigateToPage(Page.SelectAddress);
	}
}
