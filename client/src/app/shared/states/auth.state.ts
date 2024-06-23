import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { StateStorage } from '../classes/state-storage';
import { AuthService } from '../services/auth.service';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private authService = inject(AuthService);
  
  private user = new StateStorage<User>('user');
  private tokens = new StateStorage<Tokens>('tokens');

  login(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      tap((res) => {
        this.user.setValue(res.user);
        this.tokens.setValue(res.tokens);
      })
    );
  }
}
