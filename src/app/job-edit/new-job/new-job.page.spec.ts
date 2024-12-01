import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NewJobPage } from './new-job.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { JobService } from 'src/app/job-service/job.service';
import { User } from 'src/models/user';
import { of } from 'rxjs';
import { ProfileService } from 'src/app/profile-service/profile.service';

const user = new User();

const navigatorServiceStub = {};
const jobServiceStub = {};
const profileServiceStub = {
	getUser: () => of(user)
};

describe('NewJobPage', () => {
	let component: NewJobPage;
	let fixture: ComponentFixture<NewJobPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NewJobPage],
			imports: [FormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorServiceStub },
				{ provide: JobService, useValue: jobServiceStub },
				{ provide: ProfileService, useValue: profileServiceStub }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(NewJobPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
