import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { FormService } from './form.service';
import { Observable } from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { CheckUserResponseData } from '../shared/interface/responses';


export class UsernameValidator {
  static createValidator(formService: FormService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return formService.checkUsername(control.value).pipe(
        debounceTime(300),
        map((res: CheckUserResponseData) => res.isAvailable ? null : { invalidUserName: true })
      );
    };
  }
}
