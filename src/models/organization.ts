import { OrganizationDBO } from './dbo/organization.dbo';

export class Organization {
	id: number;
	userId: number;

	static fromDBO(dbo: OrganizationDBO): Organization {
		const O = new Organization();
		return O;
	}
}
