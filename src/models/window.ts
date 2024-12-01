import { WindowDBO } from './dbo/window.dbo';

export class Window {
	id: number;
	width: number;
	height: number;
	quantity: number;
	windowName: string;

	static fromDBO(dbo: WindowDBO): Window {
		const window = new Window();
		window.id = dbo.id;
		window.width = dbo.width;
		window.height = dbo.height;
		window.quantity = dbo.quantity;
		window.windowName = dbo.windowName;
		return window;
	}

	constructor() { }

	getPrice(price: number): number {
		if (this.width && this.height && this.quantity) {
			return this.width * this.height * price * this.quantity;
		}
		return 0;
	}
}
