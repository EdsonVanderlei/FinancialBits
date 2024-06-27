import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '../../shared/states/auth.state';
import { catchError, retry, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

const cloneReq = (req: HttpRequest<unknown>, accessToken?: string) => {
  return req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    }),
  });
};

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('No-Auth')) return next(req);
  const authState = inject(AuthState);
  const authService = inject(AuthService);

  let newReq = cloneReq(req, authState.tokens()?.access);
  return next(newReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401 && err.error.message === 'Token expired') {
        return authService.refresh(authState.tokens()?.refresh ?? '').pipe(
          switchMap((tokens) => {
            authState.tokens.set(tokens);
            newReq = cloneReq(newReq, authState.tokens()?.access);
            return next(newReq);
          })
        );
      }
      return throwError(() => new HttpErrorResponse(err));
    })
  );
};
