import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAddressesComponent } from './manage-addresses.component';
import { AddressEditComponent } from '../address-edit/address-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
	declarations: [
		ManageAddressesComponent,
		AddressEditComponent
	],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule
	],
	exports: [
		ManageAddressesComponent,
		AddressEditComponent
	]
})
export class ManageAddressesModule { }
