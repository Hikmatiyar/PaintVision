import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPage } from './confirmation.page';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { Order } from 'src/models/order';


const navigatorStub = {};
const checkoutStub = {
	order: new Order()
};


describe('ConfirmationPage', () => {
	let component: ConfirmationPage;
	let fixture: ComponentFixture<ConfirmationPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ConfirmationPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: CheckoutService, useValue: checkoutStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmationPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
