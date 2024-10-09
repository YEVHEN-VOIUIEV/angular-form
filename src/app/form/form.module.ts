import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { ErrorsComponent } from './errors';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipDirective } from './tooltip-directive';


@NgModule({
  declarations: [
    FormComponent,
    ErrorsComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormRoutingModule
  ]
})
export class FormModule { }
