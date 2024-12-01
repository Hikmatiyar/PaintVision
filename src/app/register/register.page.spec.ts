import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterPage } from './register.page';
import { FormsModule } from '@angular/forms';
import { User } from 'src/models/user';
import { NavigatorService } from '../navigator/navigator.service';

const registerStub = {
	newUser: null,
	user: User,
	register: (user: User) => {
		if (!user) {
			return false;
		}
		return true;
	},
	cancel: () => { }
};

const navigatorStub = {};

describe('RegisterPage', () => {
	let component: RegisterPage;
	let fixture: ComponentFixture<RegisterPage>;
	let mockRegisterPage: RegisterPage;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RegisterPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [
				HttpClientModule,
				FormsModule
			],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: RegisterPage, useValue: registerStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RegisterPage);
		mockRegisterPage = TestBed.get(RegisterPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should not have a New User', () => {
		expect(mockRegisterPage.newUser).toBeNull();
	});

	it('should now have a New User with info', () => {

		const newUser = { firstName: 'TESTUSER', lastName: 'Case', email: '68@gamil.com', password: 'Apple1003~', confirmPassword: 'Apple1003~' };
		const compare = { firstName: 'TESTUSER', lastName: 'Case', email: '68@gamil.com', password: 'Apple1003~', confirmPassword: 'Apple1003~' };

		mockRegisterPage.newUser = newUser;

		expect(mockRegisterPage.newUser).toEqual(compare);
	});

	it('should not register a User', () => {
		expect(mockRegisterPage.register()).toBeFalsy();
	});

});
