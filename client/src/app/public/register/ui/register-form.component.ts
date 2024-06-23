import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { confirmPasswordValidator } from '../utils/confirm-password.validator';

@Component({
  standalone: true,
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <form
      class="grid grid-cols-2 gap-4"
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <input
        pInputText
        class="w-full"
        type="text"
        id="firstName"
        formControlName="firstName"
        placeholder="First Name"
      />
      <input
        pInputText
        class="w-full"
        type="text"
        id="lastName"
        formControlName="lastName"
        placeholder="Last Name"
      />
      <input
        pInputText
        class="col-span-2"
        type="text"
        id="email"
        formControlName="email"
        placeholder="Email"
      />
      <p-password
        class="col-span-2"
        styleClass="w-full"
        inputStyleClass="w-full"
        inputId="password"
        formControlName="password"
        placeholder="Password"
        [feedback]="false"
        [toggleMask]="true"
      />
      <p-password
        class="col-span-2"
        styleClass="w-full"
        inputStyleClass="w-full"
        inputId="confirmPassword"
        formControlName="confirmPassword"
        placeholder="Confirm Password"
        [feedback]="false"
        [toggleMask]="true"
      />
      <button
        pButton
        class="col-span-2"
        type="submit"
        size="small"
        label="Submit"
        [loading]="loading()"
        [disabled]="form.invalid"
      ></button>
    </form>
  `,
})
export class RegisterFormComponent {
  private formBuilder = inject(FormBuilder);

  loading = input<boolean>(false)

  submit = output<
    Partial<{
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      confirmPassword: string;
    }>
  >();

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: [''],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, confirmPasswordValidator('password')]],
  });

  onSubmit() {
    this.submit.emit({
      firstName: this.form.value.firstName ?? undefined,
      lastName: this.form.value.lastName ?? undefined,
      email: this.form.value.email ?? undefined,
      password: this.form.value.password ?? undefined,
    });
  }
}
