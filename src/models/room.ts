import { Window } from './window';
import { RoomDBO } from './dbo/room.dbo';

export class Room {

	id: number;
	windows: Array<Window>;
	roomName: string;

	static fromDBO(dbo: RoomDBO): Room {
		const room = new Room();
		room.id = dbo.id;
		room.roomName = dbo.roomName;
		if (dbo.windows) {
			room.windows = dbo.windows.map(Window.fromDBO);
		} else {
			room.windows = [];
		}
		return room;
	}

	constructor() {
		this.windows = [];
	}

	getPrice(price: number): number {
		let result = 0;
		this.windows.forEach(w => result += w.getPrice(price));
		return result;
	}
}
