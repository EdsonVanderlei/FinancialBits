import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PublicService } from '../../services/public.service';
import { CardComponent } from '../../../shared/components/card.component';
import { FormFieldDirective } from '../../../shared/directives/form-field.directive';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    RouterLink,
    CardComponent,
    FormFieldDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './../../styles/wrapper.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private publicService = inject(PublicService);

  public form = inject(FormBuilder).group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  public submit() {
    const values = this.form.value;
    if (!values.email || !values.password) return;
    this.publicService.login(values.email, values.password).subscribe(() => {
      this.router.navigate(['private']);
    });
  }
}
