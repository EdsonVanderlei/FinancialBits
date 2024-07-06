import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, computed, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Transaction } from '../../types/transaction';
import { TransactionProps } from '../../types/transaction.props';

@Component({
  standalone: true,
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CalendarModule, InputNumberModule, InputTextareaModule, ButtonModule],
  template: `
    @if(form(); as form){
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
    }
  `,
  styles: `
    ::ng-deep .p-datepicker table td.p-datepicker-today > span:not(.p-highlight) {
      background: transparent !important;
    }
  `,
})
export class TransactionFormComponent {
  private formBuilder = inject(FormBuilder);
  localeId = inject(LOCALE_ID);
  currencyCode = inject(DEFAULT_CURRENCY_CODE);

  transaction = input<Transaction>();

  submitEvent = output<TransactionProps>();

  form = computed(() =>
    this.formBuilder.group({
      id: [this.transaction()?.id ?? null],
      date: [this.transaction()?.date ?? new Date(), Validators.required],
      description: [this.transaction()?.description ?? '', Validators.required],
      value: [this.transaction()?.value ?? 0, [Validators.required]],
    })
  );

  onSubmit() {
    const value = this.form().value;
    if (!value.date || !value.description || !value.value) return;
    this.submitEvent.emit({
      id: value.id ?? undefined,
      value: value.value,
      date: value.date,
      description: value.description,
    });
  }
}
