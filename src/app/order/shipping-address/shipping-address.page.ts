import { Component, OnInit } from '@angular/core';
import { Address } from 'src/models/address';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { Page } from 'src/app/navigator/page';
import { CheckoutService } from 'src/app/checkout/checkout.service';

@Component({
	selector: 'app-shipping-address',
	templateUrl: './shipping-address.page.html',
	styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {

	addresses: Array<Address>;
	selectedAddress: Address;
	newAddress: Address;
	addingAddress: boolean;

	constructor(private profileService: ProfileService, private navigator: NavigatorService, private checkoutService: CheckoutService) {
		this.newAddress = new Address();
	}

	ionViewWillEnter(): void {
		this.refresh();
	}

	ngOnInit(): void { }

	private refresh(): void {
		this.profileService.getUser().subscribe(
			user => this.addresses = user.getAddresses()
		);
	}

	addAddress(): void {
		this.addingAddress = true;
	}

	newAddressSaved(): void {
		this.newAddress = new Address();
		this.addingAddress = false;
		this.refresh();
	}

	goToOrderReview(): void {
		this.checkoutService.selectedAddress = this.selectedAddress;
		this.navigator.navigateToPage(Page.OrderReview);
	}
}
