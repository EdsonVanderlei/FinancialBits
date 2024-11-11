import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBaseDirective } from '../../../directives/form-base.directive';
import { FormFieldDirective } from '../../../../shared/directives/form-field.directive';
import { Category } from '../../../types/category/category';
import { Transaction } from '../../../types/transaction/transaction';
import { Wallet } from '../../../types/wallet/wallet';

type CategoryOpt = { id: string | null; name: string; color?: string };

@Component({
  standalone: true,
  selector: 'app-transaction-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    FormFieldDirective,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent extends FormBaseDirective<Transaction> {
  wallets = input<Wallet[]>();
  categories = input<Category[]>();

  categoriesOpts = computed<CategoryOpt[]>(() => {
    const result: CategoryOpt[] = [{ id: null, name: 'Nenhuma' }];
    for (const category of this.categories() ?? []) {
      result.push({
        id: category.id,
        name: category.name,
        color: category.color,
      });
    }
    return result;
  });

  override form = this.formBuilder.group({
    id: [null],
    date: [new Date(), Validators.required],
    title: [null, Validators.required],
    value: [null, Validators.required],
    walletId: [null],
    categoryId: [null],
  });

  protected override handleForm = (value?: Partial<Transaction>) => {
    this.form.reset();
    this.form.setValue({
      id: value?.id ?? null,
      date: value?.date ?? new Date(),
      title: value?.title ?? null,
      value: value?.value ?? null,
      walletId: value?.wallet?.id ?? null,
      categoryId: value?.category?.id ?? null,
    });

    if (!!value?.id) this.form.get('walletId')?.disable();
    else this.form.get('walletId')?.enable();
  };

  protected override getFormValue = () => {
    const value = this.form.getRawValue();
    return {
      ...value,
      wallet: { id: value.walletId },
      category: { id: value.categoryId },
    };
  };

  protected override validationCallback = (value?: Partial<Transaction>) =>
    !!value?.title &&
    !!value.value &&
    value.value !== 0 &&
    !!value.date &&
    !!value.wallet?.id;
}
