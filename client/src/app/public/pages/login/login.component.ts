import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { PublicService } from '../../services/public.service';
import { first } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private publicService = inject(PublicService);

  public showPassword: boolean = false;

  public form = this.formBuilder.group({
    email: ['cesar@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(5)]],
  });

  public onSubmit() {
    const value = this.form.value;

    this.publicService
      .login(value.email!, value.password!)
      .pipe(first())
      .subscribe(() => this.router.navigate(['/private']));
  }
}
