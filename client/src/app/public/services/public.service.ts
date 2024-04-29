import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Tokens } from '../../shared/models/tokens';
import { User } from '../../shared/models/user';
import { TokensState } from '../../shared/states/tokens.state';
import { UserState } from '../../shared/states/user.state';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private baseUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);
  private userState = inject(UserState);
  private tokensState = inject(TokensState);

  public login(email: string, password: string) {
    return this.http
      .post<{ tokens: Tokens; user: User }>(
        `${this.baseUrl}/login`,
        {
          email,
          password,
        },
        { headers: { 'No-Auth': 'True' } }
      )
      .pipe(
        tap((response) => {
          this.userState.setState(response.user);
          this.tokensState.setState(response.tokens);
        })
      );
  }

  public register(user: User & { password: string }) {
    return this.http.post(
      `${this.baseUrl}/register`,
      {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { headers: { 'No-Auth': 'True' } }
    );
  }

  public refresh(refreshToken: Pick<Tokens, 'refresh'>) {
    return this.http.post(
      `${this.baseUrl}/refresh`,
      {
        refreshToken: refreshToken,
      },
      { headers: { 'No-Auth': 'True' } }
    );
  }
}
