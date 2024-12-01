import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/models/room';
import { Window } from 'src/models/window';
import { JobService } from 'src/app/job-service/job.service';
import { Job } from 'src/models/job';
import { PickerController, AlertController } from '@ionic/angular';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { INavigatorListener } from 'src/app/navigator/navigator.listener';
import { Page } from 'src/app/navigator/page';
import { NavigatorService } from 'src/app/navigator/navigator.service';


@Component({
	selector: 'app-room-switcher',
	templateUrl: './room-switcher.component.html',
	styleUrls: ['./room-switcher.component.scss'],
})
export class RoomSwitcherComponent implements OnInit, INavigatorListener {
	job: Job;
	activeRoom: Room;
	@Output() cameraEnter = new EventEmitter();

	constructor(private jobService: JobService, private pickerController: PickerController,
		private alertController: AlertController, private navigatorService: NavigatorService) {
		this.navigatorService.addListener(this);
	}

	ngOnInit(): void {
		this.job = this.jobService.active;
		this.activeRoom = new Room();
	}

	onBeforeNavigate(currentPage: Page, targetPage?: Page): void {
		if (targetPage && targetPage === Page.EditJob) {
			this.job = this.jobService.active;
			if (this.job.rooms.length > 0) {
				this.activeRoom = this.job.rooms[0];
			} else {
				this.activeRoom = new Room();
			}
		}
	}

	onAfterNavigate(currentPage: Page): void { }

	private getPickerColumnOptions(): PickerColumnOption[] {
		const result = [];
		for (let i = 1; i < 16; i++) {
			const option = { text: i.toString(), value: i.toString() };
			result.push(option);
		}

		return result;
	}

	async namePicker(): Promise<void> {
		let picker: HTMLIonPickerElement;
		const options: PickerOptions = {
			cssClass: 'learning-picker',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => { }
				},
				{
					text: 'Confirm',
					role: 'select',
					handler: () => this.saveNewRoom(picker)
				}
			],
			columns: [
				{
					name: 'roomname',
					options: [
						{ text: 'Bedroom', value: 'Bedroom' },
						{ text: 'Bathroom', value: 'Bathroom' },
						{ text: 'Dining room', value: 'Dining room' },
						{ text: 'Kitchen', value: 'Kitchen' },
						{ text: 'Living room', value: 'Living room' },
						{ text: 'Storage room', value: 'Storage room' },
					]
				},
				{
					name: 'roomnumber',
					options: this.getPickerColumnOptions()
				}
			]
		};
		picker = await this.pickerController.create(options);
		picker.present();

	}

	async saveNewRoom(picker: HTMLIonPickerElement): Promise<void> {
		const roomname = await picker.getColumn('roomname');
		const roomnumber = await picker.getColumn('roomnumber');

		const selected = [
			roomname.options[roomname.selectedIndex].value,
			roomnumber.options[roomnumber.selectedIndex].value
		];

		const room = new Room();
		this.activeRoom = room;
		this.job.rooms.push(room);
		room.roomName = selected.join(' ');
	}


	async presentWindowNamePicker(): Promise<void> {
		let picker: HTMLIonPickerElement;
		const columns = [];
		this.getPickerColumnOptions().forEach(option => {
			option.text = `Window ${option.text}`;
			option.value = `Window ${option.value}`;
			columns.push(option);
		});

		const options: PickerOptions = {
			cssClass: 'learning-picker',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => { }
				},
				{
					text: 'Confirm',
					role: 'select',
					handler: () => { this.saveNewWindow(picker); }
				}
			],
			columns: [
				{
					name: 'windowName',
					options: columns
				}
			]
		};

		picker = await this.pickerController.create(options);
		picker.present();
	}

	async saveNewWindow(picker: HTMLIonPickerElement): Promise<void> {
		const windowName = await picker.getColumn('windowName');
		const selectedValue = windowName.options[windowName.selectedIndex].value;
		const window = new Window();
		this.activeRoom.windows.push(window);
		window.windowName = selectedValue;
	}

	async presentRoomDeleteAlert(): Promise<void> {
		const alert = await this.alertController.create({
			header: 'Alert',
			message: 'Do you want to delete current room?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Delete',
					role: 'confirm',
					handler: () => this.removeActiveRoom()
				}]
		});

		await alert.present();
	}

	removeActiveRoom(): void {
		const index = this.job.rooms.indexOf(this.activeRoom);
		if (index >= 0) {
			this.job.rooms.splice(index, 1);
			if (this.job.rooms.length > 0) {
				this.activeRoom = this.job.rooms[0];
			}
		}
	}

	async presentDeleteWindowAlert(window: Window): Promise<void> {
		const alert = await this.alertController.create({
			header: 'Alert',
			message: 'Do you want to delete current window?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Delete',
					role: 'confirm',
					handler: () => this.removeWindow(window)
				}]
		});

		await alert.present();
	}

	removeWindow(window: Window): void {
		const index = this.activeRoom.windows.indexOf(window);
		if (index > -1) {
			this.activeRoom.windows.splice(index, 1);
		}
	}

	onCameraEnter(): void {
		this.cameraEnter.emit();
	}
}
