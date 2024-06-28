import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { AuthState } from '../../shared/states/auth.state';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('No-Auth')) return next(req);

  const router = inject(Router);
  const authState = inject(AuthState);
  const authService = inject(AuthService);
  let refreshed = false;

  return next(cloneReq(req, authState.tokens()?.access)).pipe(
    catchError((err) => {
      if (err?.status === 401 && !refreshed) {
        refreshed = true;
        return authService.refresh({ refreshToken: authState.tokens()?.refresh ?? '' }).pipe(
          switchMap((tokens) => {
            authState.tokens.set(tokens);
            return next(cloneReq(req, authState.tokens()?.access));
          })
        );
      } else if (refreshed) {
        authState.logout();
        router.navigate(['/public']);
      }
      return throwError(() => new HttpErrorResponse(err));
    })
  );
};

const cloneReq = (req: HttpRequest<unknown>, accessToken?: string) =>
  req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
