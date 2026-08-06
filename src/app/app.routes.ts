import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/job-applications/dashboard/dashboard';
import { Form } from './features/job-applications/form/form';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login, canActivate: [guestGuard] },

  { path: 'register', component: Register, canActivate: [guestGuard] },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'applications/new',
    component: Form,
    canActivate: [authGuard]
  },

  {
    path: 'applications/:id/edit',
    component: Form,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'login' }
];
