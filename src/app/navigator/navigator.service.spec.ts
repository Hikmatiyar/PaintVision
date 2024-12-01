import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigatorService } from './navigator.service';

describe('NavigatorService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [RouterTestingModule]
	}));

	it('should be created', () => {
		const service: NavigatorService = TestBed.get(NavigatorService);
		expect(service).toBeTruthy();
	});
});
