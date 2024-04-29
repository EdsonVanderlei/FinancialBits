import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { first } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private publicService = inject(PublicService);

  public showPassword: boolean = false;

  public form = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: '',
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
  });

  public onSubmit() {
    const value = this.form.value;

    this.publicService
      .register({
        email: value.email!,
        password: value.password!,
        firstName: value.firstName!,
        lastName: value.lastName ?? undefined,
      })
      .pipe(first())
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
