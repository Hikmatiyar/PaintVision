import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/auth/auth.service';
import { of, EMPTY } from 'rxjs';

const authStub = {
	login: (credentials: { email: string, password: string }) => {
		if (credentials.password === 'ApplePass') {
			return of(true);
		} else {
			return of(false);
		}
	},
	tryAutomaticLogin: () => EMPTY
};

describe('LoginPage', () => {
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let mockAuth: AuthService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [IonicStorageModule.forRoot(), HttpClientModule, RouterTestingModule],
			providers: [{ provide: AuthService, useValue: authStub }]
		})
			.compileComponents();
	}));

	beforeEach(() => {

		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
		mockAuth = TestBed.get(AuthService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should not log in', () => {
		const credentials = { email: 'Er@gmail.com', password: 'CoconutPass' };

		mockAuth.login(credentials).subscribe(res => { expect(res).toBeFalsy(); });
	});

	it('should log in', () => {
		const credentials = { email: 'Er@gmail.com', password: 'ApplePass' };

		mockAuth.login(credentials).subscribe(res => { expect(res).toBeTruthy(); });
	});
});
