import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthenticationService);

  if (!authService.isAuthenticated) {
    console.log('Not authenticated, redirecting to login');

    // If user is not authenticated, they will be redirected to Spotify login page.
    // After Spotify login page is completed, they will be redirected to login callback page, which will
    // invoke login callback guard.
    // Login callback guard will be the one doing the redirection to the previous URL.
    const router = inject(Router);
    authService.redirectUrlAfterAuth = _state.url;
    return new RedirectCommand(router.parseUrl('/login'));
  }

  // If user is authenticated, they will be allowed to access the route.
  // redirectUrlAfterAuth will be reset to null because the guard has done its job.
  console.log('Authenticated, allowing access');
  authService.redirectUrlAfterAuth = null;
  return true;
};
