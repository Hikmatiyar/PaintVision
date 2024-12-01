import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class TokenService {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// in order:
		// load the stored token
		// create a cloned request with that token in the authorization header
		// return the 'handle' observable
		return this.authService.getStoredToken().pipe(
			switchMap((token) => {
				const newRequest = request.clone({
					method: request.method,
					setHeaders: {
						Authorization: `Bearer ${token || ''}`
					}
				});
				return of(newRequest);
			}),
			switchMap((req) => next.handle(req))
		);
	}
}

export const providers = [
	{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
];
