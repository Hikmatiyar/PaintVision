import { JobDBO } from './job.dbo';
import { AddressDBO } from './address.dbo';

export class UserDBO {
	id: number;
	organizationId: number;
	jobs: JobDBO[];
	defaultShippingAddress: AddressDBO;
	addresses: AddressDBO[];
	password: string;

	firstName: string;
	lastName: string;
	email: string;
	hashedSalt: string;
	saltAndHashPassword: string;
}
