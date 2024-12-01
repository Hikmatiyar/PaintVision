import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Page } from 'src/app/navigator/page';


@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.page.html',
	styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

	constructor(private checkoutService: CheckoutService, private nav: NavigatorService) { }

	ngOnInit(): void { }

	getOrderNumber(): number {
		return this.checkoutService.order.id;
	}

	returnToJobList(): void {
		this.nav.navigateToPage(Page.JobList);
	}
}
