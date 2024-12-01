import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { OrderHistoryService } from '../order-history.service';
import { Order } from 'src/models/order';

const navigatorStub = {};
const orderHistoryStub = {};

describe('OrderHistory/OrderComponent', () => {
	let component: OrderComponent;
	let fixture: ComponentFixture<OrderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrderComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: OrderHistoryService, useValue: orderHistoryStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderComponent);
		component = fixture.componentInstance;
		component.order = new Order();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
