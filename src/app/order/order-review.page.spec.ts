import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderReviewPage } from './order-review.page';
import { NavigatorService } from '../navigator/navigator.service';
import { CheckoutService } from '../checkout/checkout.service';
import { JobService } from '../job-service/job.service';
import { OrderHistoryService } from '../profile/order-history/order-history.service';
import { ProfileService } from '../profile-service/profile.service';
import { LocalStorageService } from '../localstorage-service/localstorage.service';
import { Order } from 'src/models/order';
import { of } from 'rxjs';
import { User } from 'src/models/user';

const navigatorStub = {
	addListener: (listener: any) => { },
	navigateToPage: (page: any) => { }
};

const checkoutServiceStub = {
	orders: [],
	selectedJobs: [],
	createOrder: (order: any, userId: any) => { }
};

const jobServiceStub = {
	squareInchPrice: 0.0006
};

const orderHistoryStub = {
	order: new Order()
};

const user = new User();
user.firstName = 'Annette';
user.lastName = 'Mattews';

const profileServiceStub = {
	getUser: () => of(user)
};

const localStorageStub = {};

describe('OrderReviewPage', () => {
	let component: OrderReviewPage;
	let fixture: ComponentFixture<OrderReviewPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrderReviewPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: NavigatorService, useValue: navigatorStub },
				{ provide: CheckoutService, useValue: checkoutServiceStub },
				{ provide: JobService, useValue: jobServiceStub },
				{ provide: OrderHistoryService, useValue: orderHistoryStub },
				{ provide: ProfileService, useValue: profileServiceStub },
				{ provide: LocalStorageService, useValue: localStorageStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderReviewPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
