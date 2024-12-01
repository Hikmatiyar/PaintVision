import { JobStatus } from '../jobstatus';
import { RoomDBO } from './room.dbo';


export class JobDBO {
	id: number;
	uuid: string;
	jobName: string;
	ownerId: number;
	status: JobStatus;
	units: string;
	rooms: Array<RoomDBO>;
}
