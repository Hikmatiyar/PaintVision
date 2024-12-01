import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/models/order';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Page } from 'src/app/navigator/page';
import { OrderHistoryService } from '../order-history.service';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	providers: [DatePipe]
})
export class OrderComponent implements OnInit {

	@Input() order: Order;
	expanded: boolean;
	currency = 'USD';
	currencyIcon = '$';

	constructor(private navigator: NavigatorService, private orderHistoryService: OrderHistoryService, private datepipe: DatePipe) {
		this.expanded = false;
	}

	ngOnInit(): void { }

	getOrderDate(): string {
		return this.datepipe.transform(this.order.orderDate, 'MM/dd/yyyy');
	}

	getOrderNumber(): number {
		return this.order.id;
	}

	toggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	goToOrderDetail(): void {
		this.orderHistoryService.getOrder(this.order.id).subscribe({
			next: (o: Order) => {
				this.orderHistoryService.order = o;
				this.navigator.navigateToPage(Page.OrderHistoryReview);
			},
			error: (err) => console.error(err)
		});
	}

	getTotalCost(): string {
		return this.order.totalCost.toFixed(2);
	}
}
