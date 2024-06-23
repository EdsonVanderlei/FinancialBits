import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <form class="grid gap-4" [formGroup]="form" (ngSubmit)="onSubmit()">
      <input
        pInputText
        class="w-full"
        type="text"
        id="email"
        formControlName="email"
        placeholder="Email"
      />
      <p-password
        styleClass="w-full"
        inputStyleClass="w-full"
        inputId="password"
        formControlName="password"
        placeholder="Password"
        [feedback]="false"
        [toggleMask]="true"
      />
      <button
        pButton
        class="w-full"
        type="submit"
        size="small"
        label="Submit"
        [loading]="loading()"
        [disabled]="form.invalid"
      ></button>
    </form>
  `,
})
export class LoginFormComponent {
  private formBuilder = inject(FormBuilder);
  
  loading = input<boolean>(false)

  submit = output<Partial<{ email: string; password: string }>>();

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.submit.emit({
      email: this.form.value.email ?? undefined,
      password: this.form.value.password ?? undefined,
    });
  }
}
