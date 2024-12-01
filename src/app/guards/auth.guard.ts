import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private alertCtrl: AlertController, private nav: Router) { }

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.auth.getUser().pipe(
			switchMap(user => {
				if (!user || !user.id) {
					// this happens sometimes, and doesn't others
					// don't have time to investigate the cause
					// just tell 'em the session expired
					// also, this is a very unlikely scenario anyway
					this.alertCtrl.create({
						header: 'Session expired',
						message: 'Session has expired. Please log in again.',
						buttons: ['OK']
					}).then(alert => alert.present().then(() => this.nav.navigateByUrl('/')));

					return of(false);
				} else {
					return of(true);
				}
			})
		);
	}
}
