import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {
      if (!!err.error?.message)
        snackBar.open(err.error.message, 'OK', { duration: 2500 });
      
      return throwError(() => err);
    })
  );
};
