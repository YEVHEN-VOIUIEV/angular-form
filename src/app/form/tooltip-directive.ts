import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input() public tooltipControl!: AbstractControl | null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.tooltipControl) {
      this.tooltipControl.statusChanges.subscribe((status: FormControlStatus) => {
        if (status === 'VALID') {
          this.el.nativeElement.style.borderColor = 'grey';
        } else {
          this.el.nativeElement.style.borderColor = 'red';

        }
      });
    }
  }

}