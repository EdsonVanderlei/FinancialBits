import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tokens } from '../types/tokens';
import { User } from '../types/user';
import { DateUtils } from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}auth/`;
  private baseOptions = { headers: { 'No-Auth': 'true' } };

  private hanldeUserDates = (user: User) => DateUtils.handleDateProps(user, ['createdAt', 'updatedAt']);

  login(body: Pick<User, 'email'> & { password: string }) {
    return this.httpClient
      .post<{ user: User; tokens: Tokens }>(`${this.baseUrl}login`, body, this.baseOptions)
      .pipe(map((res) => ({ ...res, user: this.hanldeUserDates(res.user) })));
  }

  register(body: Pick<User, 'firstName' | 'lastName' | 'email'> & { password: string }) {
    return this.httpClient
      .post<{ user: User; tokens: Tokens }>(`${this.baseUrl}register`, body, this.baseOptions)
      .pipe(map((res) => ({ ...res, user: this.hanldeUserDates(res.user) })));
  }

  refresh(body: { refreshToken: string }) {
    return this.httpClient.post<Tokens>(`${this.baseUrl}refresh`, body, this.baseOptions);
  }
}
