import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Job } from 'src/models/job';
import { JobComponent } from './job.component';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { JobService } from 'src/app/job-service/job.service';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { IonicStorageModule } from '@ionic/storage';
import { ProfileService } from 'src/app/profile-service/profile.service';

const navigatorStub = {
	addListener: (value: any) => { }
};
const jobServiceStub = {};
const checkoutServiceStub = {
	isJobSelected: () => false
};

const profileServiceStub = {};

describe('Job-List/JobComponent', () => {
	let component: JobComponent;
	let fixture: ComponentFixture<JobComponent>;
	let job: Job;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JobComponent],
			imports: [
				IonicStorageModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: JobService, useValue: jobServiceStub },
				{ provide: CheckoutService, useValue: checkoutServiceStub },
				{ provide: ProfileService, useValue: profileServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JobComponent);
		component = fixture.componentInstance;
		job = new Job();
		component.job = job;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
