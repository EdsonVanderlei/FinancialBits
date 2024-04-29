import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokensState } from '../../shared/states/tokens.state';
import { switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('No-Auth') === 'True') return next(req);

  const tokenState = inject(TokensState);
  return tokenState.state$.pipe(
    switchMap((tokens) => {
      const cloneReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + tokens?.access
        ),
      });

      return next(cloneReq);
    })
  );
};
