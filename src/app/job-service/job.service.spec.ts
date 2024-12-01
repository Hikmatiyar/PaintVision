import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { DatabaseService } from '../database-service/database.service';
import { LocalStorageService } from '../localstorage-service/localstorage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { cold } from 'jasmine-marbles';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from '../profile-service/profile.service';

const databaseServiceStub = {
	getAllJobs: () => cold('--x--y|', { x: [{ id: 1, jobName: 'Alpha', rooms: [] }], y: [{ id: 2, jobName: 'Bravo', rooms: [] }] })
};

const localStorageServiceStub = {
	getJobs: () => cold('--|')
};

const profileServiceStub = {
	getUser: () => cold('--x', { x: [{ id: 1, firstName: 'TestUser' }] })
};

const jobServiceStub = {
	getJobs: () => cold('-x|', { x: [{ id: 1, jobName: 'TestJob' }] })
};

describe('JobService', () => {
	let service: JobService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				IonicModule.forRoot(),
				MatSnackBarModule,
				NoopAnimationsModule
			],
			providers: [
				{ provide: DatabaseService, useValue: databaseServiceStub },
				{ provide: LocalStorageService, useValue: localStorageServiceStub },
				{ provide: ProfileService, useValue: profileServiceStub },
				{ provide: JobService, useValue: jobServiceStub }
			]
		});

		service = TestBed.get(JobService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get the jobs from the cold observable', () => {
		service.getJobs().subscribe((val) => expect(val).toBeDefined());
	});
});
