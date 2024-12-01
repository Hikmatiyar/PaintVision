import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatabaseService } from 'src/app/database-service/database.service';
import { User } from 'src/models/user';
import { LocalStorageService } from '../localstorage-service/localstorage.service';
import { NavigatorService } from '../navigator/navigator.service';
import { Page } from '../navigator/page';
import { Platform } from '@ionic/angular';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user$ = new BehaviorSubject(null);

	constructor(private localStorageService: LocalStorageService, private platform: Platform,
		private nav: NavigatorService, private databaseService: DatabaseService, private jwtHelper: JwtHelperService) {
	}

	login(credentials: { email: string, password: string }): Observable<any> {
		return this.databaseService.login(credentials.email, credentials.password).pipe(
			switchMap(token => {
				token = token.token;
				const decoded = this.jwtHelper.decodeToken(token).user;
				const user = new User();
				user.id = decoded.id;
				user.firstName = decoded.firstName;
				user.lastName = decoded.lastName;
				user.email = decoded.email;
				this.setUser(user);
				return this.localStorageService.setLoginToken(token);
			})
		);
	}

	tryAutomaticLogin(): Observable<void> {
		const platformObs = from(this.platform.ready());
		let storedToken: string;

		return platformObs.pipe(
			switchMap(() => this.getStoredToken()),
			tap(val => storedToken = val),
			switchMap(() => this.validateToken(storedToken)),
			map(tokenValid => {
				if (tokenValid) {
					const decoded = this.decodeToken(storedToken).user;
					const user = new User();
					user.id = decoded.id;
					user.firstName = decoded.firstName;
					user.lastName = decoded.lastName;
					user.email = decoded.email;
					this.setUser(user);
					this.nav.navigateToPage(Page.NewJob);
				}
			})
		);
	}

	getStoredToken(): Observable<string> {
		return this.localStorageService.getLoginToken();
	}

	decodeToken(token: string): any {
		return this.jwtHelper.decodeToken(token);
	}

	validateToken(token: string): Observable<boolean> {
		return this.databaseService.validateToken().pipe(
			catchError(() => of(false))
		);
	}

	getUser(): Observable<User> {
		return this.user$;
	}

	setUser(user: User): void {
		this.user$.next(user);
	}

	logout(): void {
		this.localStorageService.clearLoginToken();
		this.setUser(null);
		this.nav.navigateToPage(Page.Login);
	}
}
