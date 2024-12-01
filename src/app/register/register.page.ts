import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { DatabaseService } from 'src/app/database-service/database.service';
import { NavigatorService } from '../navigator/navigator.service';
import { Page } from '../navigator/page';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

	user: User;
	registerError: string;

	newUser = {
		firstName: '',
		lastName: '',
		password: '',
		email: ''
	};

	compare = {
		confirmPassword: ''
	};

	constructor(private navigator: NavigatorService, private databaseService: DatabaseService) { }

	ngOnInit(): void { }

	register(): void {
		this.registerError = '';
		this.user = new User();
		this.user.firstName = this.newUser.firstName;
		this.user.lastName = this.newUser.lastName;
		this.user.password = this.newUser.password;
		this.user.email = this.newUser.email;

		this.databaseService.createUser(this.user)
			.pipe(
				catchError(err => {
					this.registerError = 'There was a problem while registering. Please try again later.';
					return throwError(err);
				})
			).subscribe({
				next: () => this.navigator.navigateToPage(Page.Login)
			});
	}

	cancel(): void {
		this.navigator.navigateToPage(Page.Login);
	}
}
