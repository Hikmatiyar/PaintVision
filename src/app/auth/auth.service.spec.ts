import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';

let jwtHelper: JwtHelperService;

describe('AuthService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [JwtHelperService],
			imports: [
				IonicStorageModule.forRoot(),
				RouterTestingModule,
				HttpClientModule,
				JwtModule.forRoot({
					config: {
					  tokenGetter: () => {
						return '';
					  }
					}
				  })]
		});
		jwtHelper = TestBed.get(JwtHelperService);
	});


	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
