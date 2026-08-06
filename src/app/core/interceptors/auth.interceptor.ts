import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authenticatedRequest = token
    ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : request;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
  error.status === 401 &&
  !request.url.includes('/Auth/login') &&
  !request.url.includes('/Auth/register')
) {
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  router.navigate(['/login']);
}

      return throwError(() => error);
    })
  );
};