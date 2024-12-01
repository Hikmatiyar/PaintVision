import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { OrderHistoryPage } from './order-history.page';
import { OrderComponent } from './order/order.component';
import { OrderDetailModule } from 'src/app/order-detail/order-detail.module';
import { OrderHistoryReviewPage } from './order-review/order-review.page';

const routes: Routes = [
	{
		path: '',
		component: OrderHistoryPage
	},
	{
		path: 'review',
		component: OrderHistoryReviewPage
	},
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		OrderDetailModule
	],
	declarations: [
		OrderHistoryPage,
		OrderComponent,
		OrderHistoryReviewPage
	]
})
export class OrderHistoryPageModule { }
