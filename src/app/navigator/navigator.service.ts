import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from './page';
import { INavigatorListener } from './navigator.listener';

@Injectable({
	providedIn: 'root'
})
export class NavigatorService {

	listeners: INavigatorListener[];
	currentPage: Page;

	constructor(private router: Router) {
		this.listeners = [];
		this.currentPage = Page.JobList;
	}

	addListener(listener: INavigatorListener): void {
		this.listeners.push(listener);
	}

	removeListener(listener: INavigatorListener): void {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	pageFromPath(path: string): Page {
		let p: Page;
		try {
			p = Page[path];
		} catch {
			p = null;
		}
		return p;
	}

	onBeforeNavigate(currentPage: Page, targetPage?: Page): void {
		this.listeners.forEach((l) => l.onBeforeNavigate(currentPage, targetPage));
	}

	onAfterNavigate(currentPage: Page): void {
		this.listeners.forEach((l) => l.onAfterNavigate(currentPage));
	}

	navigateToPage(page: Page): void {
		this.onBeforeNavigate(this.currentPage, page);

		this.router.navigate([page]);

		this.currentPage = page;

		this.onAfterNavigate(page);
	}
}
