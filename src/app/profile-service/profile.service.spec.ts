import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { cold } from 'jasmine-marbles';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/models/user';
import { of } from 'rxjs';
import { LocalStorageService } from '../localstorage-service/localstorage.service';


const user = new User();

const authServiceStub = {
	getUser: () => cold('---x|', { x: user })
};

const localStorageStub = {
	getUnits: () => of('cm')
};

describe('ProfileService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			{ provide: AuthService, useValue: authServiceStub },
			{ provide: LocalStorageService, useValue: localStorageStub }
		]
	}));

	it('should be created', () => {
		const service: ProfileService = TestBed.get(ProfileService);
		expect(service).toBeTruthy();
	});
});
