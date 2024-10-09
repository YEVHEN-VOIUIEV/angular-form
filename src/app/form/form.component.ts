import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';
import { UsernameValidator } from './username.validator';
import { Country } from '../shared/enum/country';
import { CountryValidator } from './country.validator';
import { Observable, Subject, Subscription, take, takeUntil, timer } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './custom-date-parser-formatter.service';

const maxUsers = 10;
export const countryList = Object.keys(Country).map((key: string) => key);
const currentTimerValue = 5;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class FormComponent {

  public isSubmit: boolean = false;
  public timer: string = '';

  public suggestions: Array<Array<string>> = [];

  public form: FormGroup<{ users: FormArray<FormControl<unknown>> }> = this.fb.group({
    users: this.fb.array([])
  });

  public get userList(): FormArray {
    return this.form.controls['users'] as FormArray;
  }

  public get invalidCount(): number {
    return (this.userList.controls as Array<AbstractControl>).filter((control: AbstractControl) => control.invalid).length;
  }

  public get isAvailableToAddUser() {
    return this.userList.length < maxUsers;
  }

  public maxDate: { year: number, month: number, day: number };

  private cancel$ = new Subject<void>();
  private timer$: Observable<number> = timer(0, 1000).pipe(takeUntil(this.cancel$));
  private subTimer!: Subscription;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) { 
    this.addUser();

    const today = new Date();
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  public newUser(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required, CountryValidator.createValidator()],
      name: ['', Validators.required, UsernameValidator.createValidator(this.formService)],
      birthday: ['', Validators.required],
    });
  }

  public addUser(): void {
    this.userList.push(this.newUser());
  }

  public deleteUser(userIndex: number) {
    this.userList.removeAt(userIndex);
  }

  public onSearch(control: AbstractControl | null, i: number) {
    if (control === null) return;

    const searchTermLower = control.value.toLowerCase();

    if (searchTermLower) {
      this.suggestions[i] = countryList.filter((country: string) => country.toLowerCase().includes(searchTermLower));
    } else {
      this.suggestions[i] = [];
    }
  }

  public selectSuggestion(control: AbstractControl | null, suggestion: string, i: number): void {
    if (control === null) return;

    control.setValue(suggestion);
    this.suggestions[i] = [];
  }

  public startSubmit(): void {
    this.isSubmit = true;
    this.form.disable();
    this.subTimer?.unsubscribe();

    let _currentTimerValue = currentTimerValue;

    this.subTimer = this.timer$.subscribe({
      next: () => {
        this.timer = `0:0${_currentTimerValue}`;

        if (_currentTimerValue === 0) {
          this.onSubmit();
        }

        _currentTimerValue--;
      },
      complete: this.cancelSubmit.bind(this),
    });
  }

  public cancelSubmit(): void {
    this.cancel$.next();  
    this.cancel$.complete();
    this.isSubmit = false;
    this.form.enable();
  }

  public onSubmit(): void {
    this.formService.submitForm(this.form.value).pipe(take(1)).subscribe(this.cancelSubmit.bind(this));
  }
}
