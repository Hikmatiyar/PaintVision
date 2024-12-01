import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { Address } from 'src/models/address';

@Component({
	selector: 'app-edit-address',
	templateUrl: './address-edit.component.html',
	styleUrls: ['./address-edit.component.scss'],
})
export class AddressEditComponent implements OnInit {

	@Input() address: Address;
	@Output() saved = new EventEmitter<void>();

	constructor(private profileService: ProfileService) { }

	ngOnInit(): void { }

	saveAddress(): void {
		this.profileService.getUser().subscribe(user => {
			user.addresses.push(this.address);
			this.address = new Address();
			this.saved.emit();
		});
	}
}
