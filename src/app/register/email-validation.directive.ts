import { Directive } from '@angular/core';
import { NG_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DatabaseService } from 'src/app/database-service/database.service';

@Directive({
	selector: '[appEmailValidation]',
	providers: [{
		provide: NG_ASYNC_VALIDATORS,
		useExisting: EmailValidationDirective,
		multi: true
	}]
})
export class EmailValidationDirective implements AsyncValidator {

	constructor(private db: DatabaseService) { }

	validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		return this.db.checkDuplicateEmail(control.value).pipe(
			map(res => {
				if (res.isDuplicate) {
					return { isDuplicate: true };
				}
				return null;
			}),
			catchError(() => {
				return of({ noConnection: true });
			}),
		);
	}

}
