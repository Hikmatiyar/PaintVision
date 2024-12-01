import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { MustEqualDirective } from './must-equal.directive';
import { EmailValidationDirective } from './email-validation.directive';

const routes: Routes = [
	{
		path: '',
		component: RegisterPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [RegisterPage, MustEqualDirective, EmailValidationDirective]
})
export class RegisterPageModule { }
