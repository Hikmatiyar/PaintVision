import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { JobListPage } from './job-list.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JobService } from '../job-service/job.service';
import { NavigatorService } from '../navigator/navigator.service';

const jobServiceStub = {};

const navigatorStub = {
	addListener: () => { }
};

describe('JobListPage', () => {
	let component: JobListPage;
	let fixture: ComponentFixture<JobListPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JobListPage],
			imports: [
				IonicModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: JobService, useValue: jobServiceStub },
				{ provide: NavigatorService, useValue: navigatorStub }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(JobListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));
});
