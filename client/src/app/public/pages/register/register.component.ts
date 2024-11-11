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
  selector: 'app-register',
  standalone: true,
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
  templateUrl: './register.component.html',
  styleUrl: './../../styles/wrapper.scss',
})
export class RegisterComponent {
  private router = inject(Router);
  private publicService = inject(PublicService);

  public form = inject(FormBuilder).group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  public submit() {
    const values = this.form.value;
    if (!values.name || !values.email || !values.password) return;
    this.publicService
      .register(values.name, values.email, values.password)
      .subscribe(() => {
        this.router.navigate(['private']);
      });
  }
}
