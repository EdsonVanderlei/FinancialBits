import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormBaseDirective } from '../../../directives/form-base.directive';
import { FormFieldDirective } from '../../../../shared/directives/form-field.directive';
import { Wallet } from '../../../types/wallet/wallet';

@Component({
  standalone: true,
  selector: 'app-wallet-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FormFieldDirective,
  ],
  templateUrl: './wallet-form.component.html',
  styleUrl: './wallet-form.component.scss',
})
export class WalletFormComponent extends FormBaseDirective<Wallet> {
  override form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    balance: [0, Validators.required],
  });

  protected override handleForm = (value?: Partial<Wallet>) => {
    this.form.reset();
    this.form.setValue({
      id: value?.id ?? null,
      name: value?.name ?? null,
      balance: value?.balance ?? null,
    });

    if (value?.id) this.form.get('balance')?.disable();
    else this.form.get('balance')?.enable();
  };

  protected override validationCallback = (value?: Partial<Wallet>) =>
    !!value?.name && typeof value.balance !== 'undefined';
}
