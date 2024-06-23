import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../shared/services/auth.service';
import { AuthState } from '../../shared/states/auth.state';
import { RegisterFormComponent } from './ui/register-form.component';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [RegisterFormComponent, CardModule, ButtonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private router = inject(Router);
  private authState = inject(AuthState);
  private authService = inject(AuthService);

  loading = false;

  onRegister(
    value: Partial<{
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    }>
  ) {
    if (!value.firstName || !value.email || !value.password) return;
    this.loading = true;
    this.authService
      .register(
        value.firstName,
        value.email,
        value.password,
        value.lastName ?? undefined
      )
      .subscribe({
        error: () => (this.loading = false),
        next: (response) => {
          this.authState.login(response.user, response.tokens);
          this.router.navigate(['/private']);
        },
      });
  }
}
