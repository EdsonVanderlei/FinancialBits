import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse)
        messageService.add({
          severity: 'error',
          summary: `${err.status} ${err.statusText}`,
          detail: err.error.message,
        });
      return throwError(() => new Error(err.error.message));
    })
  );
};
