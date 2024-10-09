import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent {
  @Input() field!: AbstractControl | null;

  getErrorMessages(): string {
    if (this.field?.errors?.['invalidCountry'])
      return 'Please provide a correct Country';

    if (this.field?.errors?.['invalidUserName'])
      return 'Please provide a correct Username';

    if (this.field?.errors?.['required'])
      return 'Field is required';

    return '';
  }
}
