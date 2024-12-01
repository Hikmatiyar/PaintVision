import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule]
	}));

	it('should be created', () => {
		const service: DatabaseService = TestBed.get(DatabaseService);
		expect(service).toBeTruthy();
	});
});
