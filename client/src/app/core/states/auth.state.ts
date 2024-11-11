import { computed, Injectable, signal } from '@angular/core';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private _user = signal<User | null>(this.getItem('user'));
  private _tokens = signal<Tokens | null>(this.getItem('tokens'));

  public readonly user = computed(() => this._user());
  public readonly tokens = computed(() => this._tokens());
  public readonly logged = computed(() => !!this.tokens() && !!this.user());

  public setUser(user: User | null) {
    this.setItem('user', user);
  }

  public setTokens(tokens: Tokens | null) {
    this.setItem('tokens', tokens);
  }

  public setAccessToken(accessToken: string) {
    const tokens = this.tokens();
    if (!tokens) return;
    tokens.accessToken = accessToken;
    this.setItem('tokens', tokens);
  }

  private getItem<T>(key: 'user' | 'tokens') {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (e) {
      return null;
    }
  }

  private setItem(key: 'user' | 'tokens', value: any) {
    this[`_${key}`].set(value);
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }
}
