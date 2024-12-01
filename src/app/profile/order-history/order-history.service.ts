import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/database-service/database.service';
import { Order } from 'src/models/order';
import { Observable } from 'rxjs';
import { retry, switchMap, tap } from 'rxjs/operators';
import { Job } from 'src/models/job';
import { ProfileService } from 'src/app/profile-service/profile.service';

@Injectable({
	providedIn: 'root'
})
export class OrderHistoryService {
	order: Order;

	constructor(private databaseService: DatabaseService, private profileService: ProfileService) {
		this.order = new Order();
	}

	getOrderHistory(): Observable<Order[]> {
		return this.profileService.getUser().pipe(
			switchMap(user => this.databaseService.getOrderHistory(user.id))
		);
	}

	getOrder(orderId: number): Observable<Order> {
		return this.databaseService.getOrder(orderId).pipe(
			retry(2)
		);
	}
}
