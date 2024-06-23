import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth/';

  login(email: string, password: string) {
    return this.httpClient.post<{ user: User; tokens: Tokens }>(
      `${this.baseUrl}login`,
      { email, password },
      { headers: { 'No-Auth': 'true' } }
    );
  }
}
