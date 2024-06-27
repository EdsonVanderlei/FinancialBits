import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  standalone: true,
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CalendarModule, InputNumberModule, InputTextareaModule, ButtonModule],
  template: `
    <form class="grid grid-cols-2 gap-4" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-4">
        <p-inputNumber
          styleClass="w-full"
          inputStyleClass="text-right"
          inputId="value"
          mode="currency"
          placeholder="Value"
          formControlName="value"
          [locale]="localeId"
          [currency]="currencyCode"
          [prefix]="positiveTransactionValue() ? undefined : '- '"
        />
        <textarea
          pInputTextarea
          rows="5"
          cols="1"
          class="flex-1"
          placeholder="Description"
          formControlName="description"
        ></textarea>
      </div>
      <p-calendar [inline]="true" [showButtonBar]="true" formControlName="date" />
      <p-button
        class="col-span-2"
        styleClass="w-full"
        type="submit"
        size="small"
        severity="primary"
        label="Submit"
        [disabled]="form.invalid"
      />
    </form>
  `,
})
export class TransactionFormComponent {
  private formBuilder = inject(FormBuilder);
  localeId = inject(LOCALE_ID);
  currencyCode = inject(DEFAULT_CURRENCY_CODE);

  visible = input<boolean>(false);
  positiveTransactionValue = input<boolean>(true);

  submit = output<{ value: number; date: Date; description: string }>();

  form = this.formBuilder.group({
    value: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), Validators.required],
    description: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.visible())
        this.form.setValue({
          value: null,
          date: new Date(),
          description: null,
        });
    });
  }

  onSubmit() {
    const value = this.form.value;
    if (!value.date || !value.description || !value.value) return;
    this.submit.emit({
      value: value.value,
      date: value.date,
      description: value.description,
    });
  }
}
