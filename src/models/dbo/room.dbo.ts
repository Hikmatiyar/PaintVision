import { WindowDBO } from './window.dbo';

export class RoomDBO {
	id: number;
	jobId: number;
	windows: Array<WindowDBO>;
	roomName: string;
}
