import { AddressDBO } from './dbo/address.dbo';

export class Address {
	id: number;
	line1: string;
	line2: string;
	line3: string;
	country: string;
	provinceState: string;
	postalCode: string;
	townCity: string;
	email: string;
	phone: string;
	name: string;


	static fromDBO(dbo: AddressDBO): Address {
		const A = new Address();
		A.country = dbo.country;
		A.email = dbo.email;
		A.id = dbo.id;
		A.line1 = dbo.line1;
		A.line2 = dbo.line2;
		A.line3 = dbo.line3;
		A.phone = dbo.phone;
		A.postalCode = dbo.postalCode;
		A.provinceState = dbo.provinceState;
		A.townCity = dbo.townCity;
		A.name = dbo.name;
		return A;
	}
	constructor() {
		this.country = 'USA';
	}

}
