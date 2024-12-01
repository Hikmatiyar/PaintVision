import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrderReviewPage } from './order-review.page';
import { ConfirmationPage } from './confirmation/confirmation.page';
import { ShippingAddressPage } from './shipping-address/shipping-address.page';
import { ManageAddressesModule } from '../profile/manage-addresses/manage-addresses.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';

const routes: Routes = [
	{
		path: '',
		component: OrderReviewPage
	},
	{
		path: 'order-confirmation',
		component: ConfirmationPage
	},
	{
		path: 'shipping-address',
		component: ShippingAddressPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ManageAddressesModule,
		OrderDetailModule
	],
	declarations: [
		OrderReviewPage,
		ConfirmationPage,
		ShippingAddressPage
	]
})
export class OrderPageModule { }
