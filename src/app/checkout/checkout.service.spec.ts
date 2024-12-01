import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { NavigatorService } from '../navigator/navigator.service';
import { JobService } from '../job-service/job.service';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../database-service/database.service';
import { LocalStorageService } from '../localstorage-service/localstorage.service';

const navigatorStub = {
	addListener: (value: any) => { }
};

const jobServiceStub = jasmine.createSpyObj('JobService', ['getJobs']);

const dbServiceStub = {};

const storageStub = {};

describe('CheckoutService', () => {


	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			IonicModule.forRoot(),
		],
		providers: [
			{ provide: NavigatorService, useValue: navigatorStub },
			{ provide: JobService, useValue: jobServiceStub },
			{ provide: DatabaseService, useValue: dbServiceStub },
			{ provide: LocalStorageService, useValue: storageStub }
		]
	}));

	it('should be created', () => {
		const service: CheckoutService = TestBed.get(CheckoutService);
		expect(service).toBeTruthy();
	});

});
