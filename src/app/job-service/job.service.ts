import { Injectable } from '@angular/core';
import { Job } from 'src/models/job';
import { Observable, of, merge, from } from 'rxjs';
import { retry, catchError, switchMap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/database-service/database.service';
import { LocalStorageService } from 'src/app/localstorage-service/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile-service/profile.service';

@Injectable({
	providedIn: 'root'
})
export class JobService {
	active: Job;
	squareInchPrice: number;
	taxDecimal: number;
	shippingCost: number;
	currencyIcon = '$';

	constructor(private databaseService: DatabaseService, private localStorage: LocalStorageService,
		private snackBar: MatSnackBar, private profileService: ProfileService) {
		this.squareInchPrice = 0.006;
		this.taxDecimal = 0.075;
		this.shippingCost = 5.00;
		this.active = new Job();
	}

	setActive(job: Job): void {
		this.active = job;
	}

	getJobs(): Observable<Job[]> {
		return merge(this.getRemoteJobs(), this.getLocalJobs());
	}

	getSquareCmPrice(): number {
		return this.squareInchPrice / 2.54;
	}

	getTaxDecimal(): number {
		return this.taxDecimal;
	}

	getShippingCost(): number {
		return this.shippingCost;
	}

	getTotalCost(jobs: Job[]): number {
		let result = 0;
		jobs.forEach(j => result += j.getPrice(this.squareInchPrice));
		result += this.getShippingCost();
		return result *= (1 + this.getTaxDecimal());
	}

	deleteJob(job: Job): Observable<boolean> {
		return from(this.localStorage.removeJob(job)).pipe(
			switchMap(res => {
				if (!res) {
					return this.databaseService.deleteJob(job.id).pipe(
						switchMap(() => of(true)),
						catchError(() => of(false))
					);
				} else {
					return of(false);
				}
			})
		);
	}

	private getLocalJobs(): Observable<Job[]> {
		return this.localStorage.getJobs();
	}

	private getRemoteJobs(): Observable<Job[]> {
		return this.profileService.getUser().pipe(
			switchMap(user => {
				return this.databaseService.getAllJobs(user.id);
			}),
			retry(2),
			catchError(() => {
				this.snackBar.open('Error: Could not connect to server.', 'OK')._dismissAfter(10000);
				return of([]);
			})
		);
	}
}
