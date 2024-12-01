import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';
import { NavController } from '@ionic/angular';

const navCtrlStub = {

};

describe('TabsPage', () => {
	let component: TabsPage;
	let fixture: ComponentFixture<TabsPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TabsPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [{ provide: NavController, useValue: navCtrlStub }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TabsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
