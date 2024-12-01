import { Component, ViewChild } from '@angular/core';
import { IonTabBar, IonTabs, NavController } from '@ionic/angular';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	@ViewChild('tabs', { static: false }) tabs: IonTabs;

	constructor(private navCtrl: NavController) { }

	async onTabChange(tab: string, $event: MouseEvent): Promise<boolean> {
		const tabSelected = this.tabs.getSelected();
		$event.stopImmediatePropagation();
		$event.preventDefault();
		return tabSelected !== tab
			? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
			: this.tabs.select(tab);
	}
}
