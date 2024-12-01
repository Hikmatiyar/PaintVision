import { JobStatus } from './jobstatus';
import { Room } from './room';
import { JobDBO } from './dbo/job.dbo';
import { v4 } from 'uuid';
import { Window } from './window';

export class Job {
	id: number;
	ownerId: number;
	jobName: string;
	status: JobStatus;
	rooms: Array<Room>;
	uuid: string;
	units: string;

	static fromDBO(dbo: JobDBO): Job {
		const job = new Job();
		job.id = dbo.id;
		job.ownerId = dbo.ownerId;
		job.jobName = dbo.jobName;
		job.uuid = dbo.uuid;
		if (dbo.rooms) {
			job.rooms = dbo.rooms.map(Room.fromDBO);
		} else {
			job.rooms = [];
		}

		job.status = dbo.status as JobStatus;
		job.units = dbo.units;
		return job;
	}

	constructor() {
		this.rooms = [];
		this.uuid = v4();
	}

	getPrice(squareInchPrice: number): number {
		let result = 0;
		const price = this.units === 'in' ? squareInchPrice : (squareInchPrice / 2.54);
		this.rooms.forEach(r => result += r.getPrice(price));
		return result;
	}

	convertUnits(): void {
		function convert(w: Window, convertFn: (n: number) => number): Window {
			w.height = convertFn(w.height);
			w.width = convertFn(w.width);
			return w;
		}

		const converter = this.units === 'cm' ? (n) => n / 2.54 : (n) => n * 2.54;

		this.rooms.forEach(r => r.windows.forEach(w => w = convert(w, converter)));
		this.units = this.units === 'cm' ? 'in' : 'cm';
		console.log(this);
	}
}
