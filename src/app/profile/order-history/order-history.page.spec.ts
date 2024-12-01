import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryPage } from './order-history.page';
import { OrderHistoryService } from './order-history.service';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { Order } from 'src/models/order';
import { of } from 'rxjs';

const orderHistoryServiceStub = {
	getOrderHistory: () => of([new Order()])
};

const navigatorStub = {
	addListener: (listener: any) => { }
};

describe('OrderHistoryPage', () => {
	let component: OrderHistoryPage;
	let fixture: ComponentFixture<OrderHistoryPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrderHistoryPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: OrderHistoryService, useValue: orderHistoryServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderHistoryPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
