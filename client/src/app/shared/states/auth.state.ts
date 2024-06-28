import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private toastService = inject(ToastService);
  private storageService = inject(StorageService);

  user = signal<User | null>(this.storageService.get('user'));
  tokens = signal<Tokens | null>(this.storageService.get('tokens'));

  logged = computed(() => !!this.user() && !!this.tokens());

  constructor() {
    effect(() => {
      this.storageService.handle(this.user(), 'user');
      this.storageService.handle(this.tokens(), 'tokens');
    });
  }

  login(user: User, tokens: Tokens) {
    this.user.set(user);
    this.tokens.set(tokens);
    this.toastService.addSuccess('Successfully logged in');
  }

  logout() {
    this.user.set(null);
    this.tokens.set(null);
    this.toastService.addSuccess('Successfully logged out');
  }
}
