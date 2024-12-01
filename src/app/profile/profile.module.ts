import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageAddressesModule } from './manage-addresses/manage-addresses.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ManageAddressesModule,
		RouterModule.forChild([{
			path: '',
			component: ProfilePage
		},
		{
			path: 'shipping',
			component: ManageAddressesComponent
		},
		{
			path: 'manage',
			component: ManageProfileComponent
		},
		{
			path: 'order-history',
			loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryPageModule)
		}
		])
	],
	declarations: [
		ProfilePage,
		ManageProfileComponent
	]
})
export class ProfilePageModule { }
