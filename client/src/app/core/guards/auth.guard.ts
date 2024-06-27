import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const logged = inject(AuthState).logged();
  const path = state.url.split('/').filter((url) => !!url)[0];

  if (path === 'private' && !logged) return router.createUrlTree(['/public']);
  if (path === 'public' && logged) return router.createUrlTree(['/private']);
  return true;
};
