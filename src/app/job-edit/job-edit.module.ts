import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewJobPage } from './new-job/new-job.page';
import { RoomSwitcherComponent } from './room-switcher/room-switcher.component';
import { WindowFormComponent } from './room-switcher/window-form/window-form.component';
import { CheckoutModule } from '../checkout/checkout.module';
import { JobEditPage } from './job-edit.page';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';


@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		CheckoutModule,
		RouterModule.forChild([{
			path: '',
			component: NewJobPage
		},
		{
			path: 'edit-job',
			component: JobEditPage,
			canDeactivate: [CanDeactivateGuard]
		}])
	],
	declarations: [
		NewJobPage,
		JobEditPage,
		RoomSwitcherComponent,
		WindowFormComponent
	],
	providers: [
		CanDeactivateGuard
	]
})
export class JobEditModule { }
