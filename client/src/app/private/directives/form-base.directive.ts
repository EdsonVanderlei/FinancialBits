import { getLocaleCurrencyCode } from '@angular/common';
import {
  Directive,
  inject,
  input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';

@Directive({
  selector: '[appFormBase]',
  standalone: true,
})
export abstract class FormBaseDirective<T> implements OnChanges {
  value = input<Partial<T> | undefined>();

  submitEvent = output<Partial<T>>();
  cancelEvent = output<void>();
  
  localeId = getLocaleCurrencyCode(inject(LOCALE_ID)) ?? undefined;
  protected formBuilder = inject(UntypedFormBuilder);

  protected getFormValue: () => Partial<T> = () =>
    this.form.getRawValue();

  abstract form: FormGroup;
  protected abstract handleForm: (value?: Partial<T>) => void;
  protected abstract validationCallback: (value?: Partial<T>) => boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) this.handleForm(this.value());
  }

  onSubmit() {
    const value = this.getFormValue();
    if (!this.validationCallback(value)) return;
    this.submitEvent.emit(value);
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
