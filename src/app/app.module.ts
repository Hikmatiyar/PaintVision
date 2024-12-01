import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { providers as tokenProviders } from './token-service/token.service';

export function jwtOptionsFactory(storage: Storage): any {
	return {
		tokenGetter: () => storage.get('jwt-token'),
		whitelistedDomains: ['http://painless-prep.us-east-2.elasticbeanstalk.com', 'gopainlessprep.com']
	};
}

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot({
			scrollPadding: false,
			scrollAssist: true
		}),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		HttpClientModule,
		MatSnackBarModule,
		BrowserAnimationsModule,
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [Storage]
			}
		})
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		...tokenProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
