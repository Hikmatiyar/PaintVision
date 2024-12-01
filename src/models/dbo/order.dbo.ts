import { JobDBO } from './job.dbo';
import { Address } from '../address';

export class OrderDBO {
	id: number;
	jobs: JobDBO[];
	orderDate: string;
	totalCost: number;
	address: Address;
}
