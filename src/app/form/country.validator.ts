import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { countryList } from './form.component';


export class CountryValidator {
  static createValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(countryList.includes(control.value) ? null : { invalidCountry: true });
    };
  }
}
