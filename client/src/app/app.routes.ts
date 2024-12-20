import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'private',
        pathMatch: 'full',
      },
      {
        path: 'public',
        loadChildren: () =>
          import('./public/public.routes').then((r) => r.publicRoutes),
      },
      {
        path: 'private',
        loadComponent: () =>
          import('./private/private.component').then((c) => c.PrivateComponent),
      },
    ],
  },
];
