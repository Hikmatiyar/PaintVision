import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../order-history.service';
import { Order } from 'src/models/order';
import { Job } from 'src/models/job';
import { Address } from 'src/models/address';

@Component({
	selector: 'app-order-review',
	templateUrl: './order-review.page.html',
	styleUrls: ['./order-review.page.scss'],
})
export class OrderHistoryReviewPage implements OnInit {

	order: Order;

	constructor(private orderHistoryService: OrderHistoryService) {
		this.order = this.orderHistoryService.order;
	}

	ngOnInit(): void { }

	ionViewWillEnter(): void {
		this.order = this.orderHistoryService.order;
	}

	getJobs(): Job[] {
		return this.order.jobs;
	}

	getAddress(): Address {
		return this.order.address;
	}
}
