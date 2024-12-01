import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditComponent } from './address-edit.component';
import { ProfileService } from 'src/app/profile-service/profile.service';
import { of } from 'rxjs';
import { User } from 'src/models/user';
import { Address } from 'src/models/address';

const user = new User();
user.firstName = 'Annette';
user.lastName = 'Mattews';
user.addresses = [new Address()];

const profileServiceStub = {
	getUser: () => of(user)
};


describe('AddressEditComponent', () => {
	let component: AddressEditComponent;
	let fixture: ComponentFixture<AddressEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddressEditComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: ProfileService, useValue: profileServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddressEditComponent);
		component = fixture.componentInstance;
		component.address = new Address();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
