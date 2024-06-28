import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}auth/`;
  private baseHeaders = { 'No-Auth': 'true' }

  login(email: string, password: string) {
    return this.httpClient.post<{ user: User; tokens: Tokens }>(
      `${this.baseUrl}login`,
      { email, password },
      { headers: this.baseHeaders }
    );
  }

  register(firstName: string, email: string, password: string, lastName?: string) {
    return this.httpClient.post<{ user: User; tokens: Tokens }>(
      `${this.baseUrl}register`,
      { firstName, lastName, email, password },
      { headers: this.baseHeaders }
    );
  }

  refresh(refreshToken: string) {
    return this.httpClient.post<Tokens>(
      `${this.baseUrl}refresh`,
      { refreshToken },
      { headers: this.baseHeaders }
    );
  }
}
