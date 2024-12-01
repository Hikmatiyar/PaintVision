import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MeasurementService } from './measurement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from '../profile-service/profile.service';
import { User } from 'src/models/user';
import { of } from 'rxjs';

const user = new User();
user.id = 1;

const profileStub = {
	getUser: () => of(user)
};

describe('MeasurementService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			RouterTestingModule,
			HttpClientTestingModule
		],
		providers: [
			{ provide: ProfileService, useValue: profileStub }
		]
	}));

	it('should be created', () => {
		const service: MeasurementService = TestBed.get(MeasurementService);
		expect(service).toBeTruthy();
	});
});
