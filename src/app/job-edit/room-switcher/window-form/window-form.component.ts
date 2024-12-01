import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Window } from 'src/models/window';
import { JobService } from 'src/app/job-service/job.service';
import { MeasurementService } from 'src/app/measurement/measurement.service';

@Component({
	selector: 'app-window-form',
	templateUrl: './window-form.component.html',
	styleUrls: ['./window-form.component.scss'],
})
export class WindowFormComponent implements OnInit {
	@Input() window: Window;
	@Output() requestDeletion = new EventEmitter();
	@Output() cameraEnter = new EventEmitter();

	expanded: boolean;
	squareInchPrice: number;
	windowName: string;
	selected: [];

	constructor(private jobService: JobService, private measurementService: MeasurementService) {
		this.expanded = false;
		this.squareInchPrice = this.jobService.squareInchPrice;
	}

	ngOnInit(): void { }

	openCamera(): void {
		this.cameraEnter.emit();
		this.measurementService.openCamera(this.window);
	}

	toggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	getPrice(): string {
		const price = this.jobService.active.units === 'cm' ? this.jobService.getSquareCmPrice() : this.jobService.squareInchPrice;
		return this.window.getPrice(price).toFixed(2);
	}

	getUnits(): string {
		return this.jobService.active.units;
	}

	tryDeleteWindow(): void {
		this.requestDeletion.emit(this.window);
	}
}
