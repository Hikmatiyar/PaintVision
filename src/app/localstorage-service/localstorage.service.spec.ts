import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';

import { LocalStorageService } from './localstorage.service';

describe('LocalStorageService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()]
	}));

	it('should be created', () => {
		const service: LocalStorageService = TestBed.get(LocalStorageService);
		expect(service).toBeTruthy();
	});
});
