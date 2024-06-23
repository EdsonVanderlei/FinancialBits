import { Injectable, inject } from '@angular/core';
import { StateStorage } from '../classes/state-storage';
import { ToastService } from '../services/toast.service';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private toastService = inject(ToastService);

  user = new StateStorage<User>('user');
  tokens = new StateStorage<Tokens>('tokens');

  get logged() {
    return !!this.user.value() && !!this.tokens.value();
  }

  login(user: User, tokens: Tokens) {
    this.user.setValue(user);
    this.tokens.setValue(tokens);
    this.toastService.addSuccess('Successfully logged in');
  }
}
