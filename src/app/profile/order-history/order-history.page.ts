import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { OrderHistoryService } from 'src/app/profile/order-history/order-history.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.page.html',
	styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
	orders$: Observable<Order[]>;

	constructor(private orderService: OrderHistoryService) {
		this.orders$ = this.orderService.getOrderHistory();
	}

	ngOnInit(): void { }

	ionViewWillEnter(): void {
		this.orders$ = this.orderService.getOrderHistory();
	}
}
