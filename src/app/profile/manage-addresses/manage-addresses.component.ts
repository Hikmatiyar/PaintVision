import { Component, OnInit } from '@angular/core';
import { Address } from 'src/models/address';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { User } from 'src/models/user';

@Component({
	selector: 'app-manage-addresses',
	templateUrl: './manage-addresses.component.html',
	styleUrls: ['./manage-addresses.component.scss'],
})
export class ManageAddressesComponent implements OnInit {

	user: User;
	edit: boolean;
	selectedAddress: Address;

	constructor(private profileService: ProfileService) {
		this.profileService.getUser().subscribe(u => this.user = u);
		this.selectedAddress = new Address();
	}

	ngOnInit(): void { }

	getAddresses(): Address[] {
		return this.user.getAddresses();
	}

	addAddress(): void {
		this.edit = true;
	}

	savedAddress(): void {
		this.edit = false;
		this.selectedAddress = new Address();
	}

	toggleEdit(addressToEdit: Address): void {
		this.edit = true;
		this.selectedAddress = addressToEdit;
	}

	save(): void {
		// save changes on server
		// this.user.addresses =
		this.edit = false;
		this.selectedAddress = new Address();
	}
}
