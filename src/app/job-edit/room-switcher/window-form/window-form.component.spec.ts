import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Window } from 'src/models/window';
import { WindowFormComponent } from './window-form.component';
import { MeasurementService } from 'src/app/measurement/measurement.service';
import { JobService } from 'src/app/job-service/job.service';

const measurementServiceStub = {};
const jobServiceStub = {};

describe('WindowFormComponent', () => {
	let component: WindowFormComponent;
	let fixture: ComponentFixture<WindowFormComponent>;
	let window: Window;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [WindowFormComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: MeasurementService, useValue: measurementServiceStub },
				{ provide: JobService, useValue: jobServiceStub }
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WindowFormComponent);
		component = fixture.componentInstance;
		window = new Window();
		component.window = window;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
