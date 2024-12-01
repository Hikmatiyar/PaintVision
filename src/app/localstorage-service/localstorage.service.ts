import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Job } from 'src/models/job';
import { from, Observable, of } from 'rxjs';
import { JobDBO } from 'src/models/dbo/job.dbo';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private jobKey = 'jobs';
	private jwtKey = 'jwt-token';
	private unitsKey = 'units';

	constructor(private storage: Storage) {
		this.initializeUnitPreferences().subscribe();
	}

	async storeJob(job: Job): Promise<void> {
		const jobs = await this._getJobs();
		jobs.push(job);
		return this._storeAllJobs(jobs);
	}

	private async _storeAllJobs(jobs: Job[]): Promise<void> {
		return this.storage.set(this.jobKey, JSON.stringify(jobs));
	}

	private async _getJobs(): Promise<Job[]> {
		const json = await this.storage.get(this.jobKey);
		const parsed = JSON.parse(json) as JobDBO[];
		if (parsed) {
			return parsed.map(Job.fromDBO);
		} else {
			return [];
		}
	}

	getJobs(): Observable<Job[]> {
		return from(this._getJobs()) as Observable<Job[]>;
	}

	removeJob(job: Job): Observable<boolean> {
		let jobs = [];
		return this.getJobs().pipe(
			switchMap(innerJobs => {
				jobs = innerJobs;
				return of(jobs.findIndex(j => j.uuid === job.uuid));
			}),
			switchMap(index => {
				if (index > -1) {
					jobs.splice(index, 1);
					return from(this._storeAllJobs(jobs)).pipe(
						switchMap(() => of(true))
					);
				} else {
					return of(false);
				}
			})
		);
	}

	getLoginToken(): Observable<string> {
		return from(this.storage.get(this.jwtKey));
	}

	setLoginToken(token: string): Observable<string> {
		return from(this.storage.set(this.jwtKey, token));
	}

	clearLoginToken(): Observable<void> {
		return from(this.storage.remove(this.jwtKey));
	}

	getUnitPreference(): Observable<string> {
		return from(this.storage.get(this.unitsKey));
	}

	setUnitPreference(units: string): Observable<string> {
		console.log('storage undefined?');
		return from(this.storage.set(this.unitsKey, units));
	}

	initializeUnitPreferences(): Observable<void> {
		return this.getUnitPreference().pipe(
			switchMap(units => {
				if (!units) {
					return this.setUnitPreference('cm');
				}
				return of(null);
			})
		);
	}
}
