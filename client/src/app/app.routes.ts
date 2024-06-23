import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'public',
        loadChildren: () =>
          import('./public/public.routes').then((r) => r.routes),
      },
      {
        path: 'private',
        loadChildren: () =>
          import('./private/private.routes').then((r) => r.routes),
      },
    ],
  },
];
