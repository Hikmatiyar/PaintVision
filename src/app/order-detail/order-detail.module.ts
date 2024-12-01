import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailComponent } from './job/job-detail.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddressDetailComponent } from './address/address-detail.component';
import { TotalDetailComponent } from './total/total-detail.component';


@NgModule({
	declarations: [
		JobDetailComponent,
		AddressDetailComponent,
		TotalDetailComponent
	],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule
	],
	exports: [
		JobDetailComponent,
		AddressDetailComponent,
		TotalDetailComponent
	]
})
export class OrderDetailModule { }
