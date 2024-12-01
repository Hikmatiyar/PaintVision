import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/main/tabs/job',
		pathMatch: 'full'
	},
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'job',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../job-edit/job-edit.module').then(m => m.JobEditModule)
					}
				]
			},
			{
				path: 'job-list',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../job-list/job-list.module').then(m => m.JobListModule)
					}
				]
			},
			{
				path: 'order',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../order/order.module').then(m => m.OrderPageModule)
					}
				]
			},
			{
				path: 'profile',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../profile/profile.module').then(m => m.ProfilePageModule)
					},
					{
						path: 'order-history',
						loadChildren: () =>
							import('../profile/order-history/order-history.module').then(m => m.OrderHistoryPageModule)
					}
				]
			},
			{
				path: 'camera',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../measurement/measurement.module').then(m => m.MeasurementModule)
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/job',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/job',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule { }
