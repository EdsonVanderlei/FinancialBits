import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthState } from '../states/auth.state';

export const authGuard: CanActivateChildFn = (_, state) => {
  const logged = inject(AuthState).logged();
  const path = state.url.split('/').filter((url) => !!url)[0];

  if (path === 'private' && !logged) return createUrlTree('/public');
  if (path === 'public' && logged) return createUrlTree('/private');
  return true;
};

const createUrlTree = (path: string) => {
  const router = inject(Router);
  return router.createUrlTree([path]);
};
