import { Page } from './page';

export interface INavigatorListener {
	onBeforeNavigate(currentPage: Page, targetPage?: Page): void;

	onAfterNavigate(currentPage: Page): void;
}
