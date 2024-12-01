import { Job } from './job';
import { OrderDBO } from './dbo/order.dbo';
import { JobStatus } from './jobstatus';
import { Address } from './address';

export class Order {
	id: number;
	jobs: Job[];
	orderDate: Date;
	totalCost: number;
	address: Address;

	static fromDBO(dbo: OrderDBO): Order {
		const order = new Order();
		order.id = dbo.id;
		order.orderDate = new Date(dbo.orderDate);
		if (dbo.jobs) {
			order.jobs = dbo.jobs.map(Job.fromDBO);
		} else {
			order.jobs = [];
		}

		order.totalCost = dbo.totalCost;
		return order;
	}

	constructor() {
		this.jobs = [];
	}
}
