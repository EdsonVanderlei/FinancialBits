import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((err: Error) => {
      if (err instanceof HttpErrorResponse) toastService.addError(`${err.status} ${err.statusText}`, err.error.message);
      return throwError(() => err);
    })
  );
};
