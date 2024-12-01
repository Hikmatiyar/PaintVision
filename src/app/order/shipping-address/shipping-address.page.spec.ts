import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressPage } from './shipping-address.page';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { of } from 'rxjs';
import { User } from 'src/models/user';


const user = new User();
user.firstName = 'Annette';
user.lastName = 'Mattews';

const profileServiceStub = {
	getUser: () => of(user)
};

const navigatorStub = {};
const checkoutStub = {};

describe('ShippingAddressPage', () => {
	let component: ShippingAddressPage;
	let fixture: ComponentFixture<ShippingAddressPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [ShippingAddressPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: ProfileService, useValue: profileServiceStub },
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: CheckoutService, useValue: checkoutStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShippingAddressPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
