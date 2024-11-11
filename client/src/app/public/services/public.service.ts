import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthState } from '../../core/states/auth.state';
import { Tokens } from '../../core/types/tokens';
import { User } from '../../core/types/user';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth/';
  private baseHeaders = new HttpHeaders({ 'No-Auth': 'true' });

  private authState = inject(AuthState);

  private refreshAuth = (res: { tokens: Tokens; user: User }) => {
    this.authState.setUser(res.user);
    this.authState.setTokens(res.tokens);
  };

  public login(email: string, password: string) {
    return this.httpClient
      .post<{ tokens: Tokens; user: User }>(
        this.baseUrl + 'login',
        { email, password },
        { headers: this.baseHeaders }
      )
      .pipe(tap(this.refreshAuth));
  }

  public register(name: string, email: string, password: string) {
    return this.httpClient
      .post<{ tokens: Tokens; user: User }>(
        this.baseUrl + 'register',
        { name, email, password },
        { headers: this.baseHeaders }
      )
      .pipe(tap(this.refreshAuth));
  }

  public refresh(refreshToken: string) {
    return this.httpClient
      .post<Pick<Tokens, 'accessToken'>>(
        this.baseUrl + 'refresh',
        { refreshToken },
        { headers: this.baseHeaders }
      )
      .pipe(tap((res) => this.authState.setAccessToken(res.accessToken)));
  }
}
