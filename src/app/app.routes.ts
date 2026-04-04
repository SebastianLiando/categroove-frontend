import {Routes} from '@angular/router';
import {LoginPage} from './pages/login-page/login-page';
import {LoginCallbackPage} from './pages/login-callback-page/login-callback-page';
import {loginCallbackGuard} from './guards/login-callback-guard';

export const routes: Routes = [
  {
    path: 'login/callback',
    component: LoginCallbackPage,
    canActivate: [loginCallbackGuard]
  },
  {
    path: 'login',
    component: LoginPage
  }
];
