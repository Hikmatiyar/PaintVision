import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobListPage } from './job-list.page';
import { JobComponent } from './job/job.component';
import { CheckoutModule } from '../checkout/checkout.module';


@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: JobListPage }]),
		CheckoutModule
	],
	declarations: [JobListPage, JobComponent]
})
export class JobListModule { }
