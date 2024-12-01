import { Address } from './address';
import { UserDBO } from './dbo/user.dbo';

export class User {
	id: number;
	organizationId: number;
	defaultShippingAddress: Address;
	addresses: Address[];
	password: string;

	firstName: string;
	lastName: string;
	email: string;
	hashedSalt: string;
	saltAndHashPassword: string;

	static fromDBO(dbo: UserDBO): User {
		const U = new User();
		U.id = dbo.id;

		U.defaultShippingAddress = Address.fromDBO(dbo.defaultShippingAddress);
		U.addresses = dbo.addresses ? dbo.addresses.map(Address.fromDBO) : [];
		return U;
	}

	constructor() {
		this.addresses = [];
	}

	getAddresses(): Address[] {
		return this.addresses;
		// return Array.from(new Set([this.defaultShippingAddress, ...this.addresses]));
	}

	getName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}
