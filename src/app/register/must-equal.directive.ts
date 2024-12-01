import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
	selector: '[appMustEqual]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: MustEqualDirective,
		multi: true
	}]
})
export class MustEqualDirective implements Validator {
	@Input() appMustEqual: string;
	validate(control: AbstractControl): { [key: string]: any } | null {
		const controlToCompare = control.parent.get(this.appMustEqual);
		if (controlToCompare && controlToCompare.value !== control.value) {
			return { notEqual: true };
		}
		return null;
	}

}
