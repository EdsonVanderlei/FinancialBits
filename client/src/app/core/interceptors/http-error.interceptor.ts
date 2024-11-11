import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, delay, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    delay(750),
    catchError((err) => {
      if (
        err instanceof HttpErrorResponse &&
        err.error.message !== 'invalid token'
      ) {
        let summary = err.error.message as string;
        summary = summary
          ? `${summary.charAt(0).toLocaleUpperCase()}${summary.slice(1)}`
          : 'Internal sever error';
        messageService.add({ summary, severity: 'error' });
      }
      return throwError(() => err);
    })
  );
};
