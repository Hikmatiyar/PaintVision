import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressesComponent } from './manage-addresses.component';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { User } from 'src/models/user';
import { of } from 'rxjs';

const user = new User();
user.firstName = 'Annette';
user.lastName = 'Mattews';

const profileServiceStub = {
	getUser: () => of(user)
};

describe('DefaultShippingAddressComponent', () => {
	let component: ManageAddressesComponent;
	let fixture: ComponentFixture<ManageAddressesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ManageAddressesComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: ProfileService, useValue: profileServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageAddressesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should have user defined', () => {
		expect(component.user).toEqual(user);
	});
});
