import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage-service/localstorage.service';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	currency: string;
	currencyIcon: string;

	constructor(private auth: AuthService, private storage: LocalStorageService) {
		this.currency = 'USD';
		this.currencyIcon = '$';
	}

	getUser(): Observable<User> {
		return this.auth.getUser();
	}

	setUser(newUser: User): void {
		return this.auth.setUser(newUser);
	}

	getUnits(): Observable<string> {
		return this.storage.getUnitPreference();
	}

	setUnits(units: string): Observable<string> {
		return this.storage.setUnitPreference(units);
	}

	ratioToCm(ratio: number): number {
		return ratio;
	}

	inToCm(inches: number): number {
		return inches * 2.54;
	}

	cmToIn(cm: number): number {
		return cm / 2.54;
	}
}
