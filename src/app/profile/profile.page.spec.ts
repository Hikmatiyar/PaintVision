import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { NavigatorService } from '../navigator/navigator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/models/user';
import { JobService } from '../job-service/job.service';
import { of } from 'rxjs';
import { ProfileService } from '../profile-service/profile.service';
import { AuthService } from '../auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const user = new User();
user.firstName = 'Annette';
user.lastName = 'Mattews';

const profileServiceStub = {
	getUser: () => of(user),
	getUnits: () => of('cm')
};

const authServiceStub = {};
const navigatorServiceStub = {};
const jobServiceStub = {};


describe('ProfilePage', () => {
	let component: ProfilePage;
	let fixture: ComponentFixture<ProfilePage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				IonicModule.forRoot(),
				RouterTestingModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			declarations: [ProfilePage],
			providers: [
				{ provide: AuthService, useValue: authServiceStub },
				{ provide: ProfileService, useValue: profileServiceStub },
				{ provide: NavigatorService, useValue: navigatorServiceStub },
				{ provide: JobService, useValue: jobServiceStub }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProfilePage);

		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should have user defined', () => {
		expect(component.user).toEqual(user);
	});
});
