import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementComponent } from './measurement.component';
import { Camera } from '@ionic-native/camera/ngx';
import { RouterModule } from '@angular/router';

@NgModule({
	providers: [Camera],
	declarations: [MeasurementComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			component: MeasurementComponent
		}])
	],
	exports: []
})
export class MeasurementModule { }
