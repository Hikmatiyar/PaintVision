import { Component } from '@angular/core';
import { Job } from 'src/models/job';
import { JobService } from 'src/app/job-service/job.service';
import { Page } from 'src/app/navigator/page';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { Order } from 'src/models/order';
import { OrderHistoryService } from '../profile/order-history/order-history.service';
import { Address } from 'src/models/address';
import { ProfileService } from '../profile-service/profile.service';
import { LocalStorageService } from '../localstorage-service/localstorage.service';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-order',
	templateUrl: './order-review.page.html',
	styleUrls: ['./order-review.page.scss']
})
export class OrderReviewPage {

	currency = 'USD';
	currencyIcon = '$';
	shippingCost: number;
	taxPercent: number;
	tax: number;
	totalCost: number;
	placingOrder: boolean;
	jobs: Job[];
	address: Address;

	constructor(private jobService: JobService, private navigator: NavigatorService,
		private checkoutService: CheckoutService, private orderHistoryService: OrderHistoryService,
		private profileService: ProfileService, private localStorageService: LocalStorageService) {
		this.address = new Address();
		this.orderHistoryService.order.jobs = [];
		this.shippingCost = 5;
		this.taxPercent = 0.0075;
	}

	ionViewWillEnter(): void {
		this.address = this.checkoutService.selectedAddress;
	}

	getSelectedJobs(): Job[] {
		return this.checkoutService.selectedJobs;
	}

	getAddress(): Address {
		return this.checkoutService.selectedAddress;
	}

	getCombinedJobCost(): number {
		let result = 0;
		this.checkoutService.selectedJobs.forEach(j => result += j.getPrice(this.jobService.squareInchPrice));
		return result;
	}

	getTotalCost(): string {
		return this.jobService.getTotalCost(this.checkoutService.selectedJobs).toFixed(2);
	}

	placeOrder(): void {
		const order = new Order();
		order.orderDate = new Date(new Date().toUTCString());
		order.totalCost = this.jobService.getTotalCost(this.checkoutService.selectedJobs);
		order.jobs = this.checkoutService.selectedJobs;
		order.address = this.checkoutService.selectedAddress;

		this.profileService.getUser().pipe(
			switchMap(user => this.checkoutService.createOrder(order, user.id))
		).subscribe(
			{
				next: async value => {
					this.checkoutService.selectedJobs.forEach(this.localStorageService.removeJob);
					this.checkoutService.selectedJobs = [];
					this.checkoutService.order = value;
					this.navigator.navigateToPage(Page.Sent);
				},
				error: (err) => console.error(err)
			}
		);
	}
}
