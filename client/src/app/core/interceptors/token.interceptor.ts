import {
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { PublicService } from '../../public/services/public.service';
import { AuthState } from '../states/auth.state';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('No-Auth')) return next(req);

  const router = inject(Router);
  const authState = inject(AuthState);
  const publicService = inject(PublicService);
  let refreshed = false;

  return next(cloneReq(req, authState.tokens()?.accessToken)).pipe(
    catchError((err) => {
      if (err?.status === 401 && !refreshed) {
        refreshed = true;
        return publicService
          .refresh(authState.tokens()?.refreshToken ?? '')
          .pipe(
            switchMap(() =>
              next(cloneReq(req, authState.tokens()?.accessToken)),
            ),
            catchError((err) => {
              logout(authState, router);
              refreshed = false;
              return throwError(() => err);
            }),
          );
      } else if (refreshed) {
        logout(authState, router);
        refreshed = false;
      }
      return throwError(() => err);
    }),
  );
};

const cloneReq = (req: HttpRequest<unknown>, accessToken?: string) =>
  req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });

const logout = (authState: AuthState, router: Router) => {
  authState.setUser(null);
  authState.setTokens(null);
  router.navigate(['/public']);
};
