import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { NavigatorService } from '../navigator/navigator.service';
import { JobService } from '../job-service/job.service';
import { IonicModule } from '@ionic/angular';
import { CheckoutService } from './checkout.service';
import { of } from 'rxjs';
import { Job } from 'src/models/job';

const navigatorStub = {
	addListener: (listener: any) => { }
};

const jobServiceStub = {
	getJobs: () => of([]),
	active: new Job()
};

const checkoutServiceStub = {};

describe('CheckoutComponent', () => {
	let component: CheckoutComponent;
	let fixture: ComponentFixture<CheckoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				IonicModule.forRoot()
			],
			declarations: [CheckoutComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: JobService, useValue: jobServiceStub },
				{ provide: CheckoutService, useValue: checkoutServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
