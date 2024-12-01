import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Camera } from '@ionic-native/camera/ngx';
import { MeasurementComponent } from './measurement.component';
import { MeasurementService } from './measurement.service';
import { Window } from 'src/models/window';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ProfileService } from '../profile-service/profile.service';
import { of } from 'rxjs';
import { LoadingController } from '@ionic/angular';

const measurementServiceStub = {
	component: null,
	window: null,
	openCamera: () => { },
	closeCamera: () => { },
	exit: () => { },
	getCorners: (uri: string) => {
		return cold('--c|', { c: [[0, 0]] });
	},
	getMeasurement: () => cold('-----x|', { x: [new Window()] }),
	getCorrectedImage: () => cold('--x|', { x: { image: 'abcdefg', corners: [[10, 20]] } })
};

const profileServiceStub = {
	getUnits: () => of('cm')
};

const loadingControllerStub = {
	create: () => {
		return {
			present: () => { },
			dismiss: () => { }
		};
	}
};

describe('MeasurementComponent', () => {
	let component: MeasurementComponent;
	let fixture: ComponentFixture<MeasurementComponent>;
	let camera: Camera;
	let measurementService: MeasurementService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MeasurementComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				Camera,
				{ provide: MeasurementService, useValue: measurementServiceStub },
				{ provide: ProfileService, useValue: profileServiceStub },
				{ provide: LoadingController, useValue: loadingControllerStub }
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(MeasurementComponent);
		camera = TestBed.get(Camera);

		spyOn(camera, 'getPicture');

		measurementService = TestBed.get(MeasurementService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create with the camera preview open', () => {
		expect(camera).toBeTruthy();
	});

	it('should assign itself to its measurement service', () => {
		expect(measurementService.component).toBe(component);
	});

	it('should take a photo and set the URI as a base64-encoded string', async () => {
		await component.takePhoto();

		// flush observables (force them to update)
		getTestScheduler().flush();

		expect(camera.getPicture).toHaveBeenCalled();
		expect(component.uri).toBeTruthy();
		expect(component.uri).toContain('data:image/jpeg;base64');
	});

	it('should get a list of corners', async () => {
		component.uri = 'test,one';
		await component.takePhoto();

		// flush observables (force them to update)
		getTestScheduler().flush();

		expect(component.uri).not.toEqual('test,one');
		expect(component.corners.length).toBeGreaterThan(0);
	});

	it('should not allow duplicate corners', async () => {
		expect(component.corners.length).toBe(0);
		expect(component.selectedCorners.length).toBe(0);

		const corner1 = [30, 20];
		const corner2 = [50, 100];
		const corner3 = [30, 20];

		component.selectCorner(corner1);
		component.selectCorner(corner2);
		component.selectCorner(corner3);

		expect(component.selectedCorners.length).toBe(2);
	});

	it('should exit when reaching four corners', async () => {
		component.uri = 'h,ello';
		spyOn(measurementService, 'closeCamera');
		measurementService.window = new Window();

		expect(measurementService.window.height).not.toBeTruthy();
		expect(measurementService.window.width).not.toBeTruthy();

		expect(component.corners.length).toBe(0);
		expect(component.selectedCorners.length).toBe(0);

		const corner1 = [30, 20];
		const corner2 = [50, 100];
		const corner3 = [35, 20];
		const corner4 = [90, 100];

		component.selectCorner(corner1);
		component.selectCorner(corner2);
		component.selectCorner(corner3);
		component.selectCorner(corner4);

		getTestScheduler().flush();
	});
});
