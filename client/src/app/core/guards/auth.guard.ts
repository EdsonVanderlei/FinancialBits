import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserState } from '../../shared/states/user.state';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const userState = inject(UserState);

  let path: string;
  if (!userState.state()) path = '/public';
  else path = '/private';

  if (state.url.includes(path)) return true;
  return router.parseUrl(path);
};
