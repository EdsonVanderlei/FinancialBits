import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../shared/services/auth.service';
import { AuthState } from '../../shared/states/auth.state';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CardModule,
    LoginFormComponent,
    ButtonModule,
    DividerModule,
    RouterLink,
  ],
})
export class LoginComponent {
  private router = inject(Router);
  private authState = inject(AuthState);
  private authService = inject(AuthService);

  loading = false;

  onLogin(value: Partial<{ email: string; password: string }>) {
    if (!value.email || !value.password) return;

    this.authService.login(value.email, value.password).subscribe({
      error: () => (this.loading = false),
      next: (response) => {
        this.authState.login(response.user, response.tokens);
        this.router.navigate(['/private']);
      },
    });
  }
}
