import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Job } from '../../../models/job';
import { RoomSwitcherComponent } from './room-switcher.component';
import { NavigatorService } from 'src/app/navigator/navigator.service';
import { JobService } from 'src/app/job-service/job.service';

const navigatorStub = {
	addListener: (value: any) => { }
};

const jobServiceStub = {
	active: new Job(),
};


describe('RoomSwitcherComponent', () => {
	let component: RoomSwitcherComponent;
	let fixture: ComponentFixture<RoomSwitcherComponent>;
	let job: Job;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RoomSwitcherComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [FormsModule],
			providers: [{ provide: NavigatorService, useValue: navigatorStub }, { provide: JobService, useValue: jobServiceStub }]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RoomSwitcherComponent);
		component = fixture.componentInstance;
		job = new Job();
		component.job = job;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(job).not.toBe(undefined);
		expect(component).toBeTruthy();
	});
});
