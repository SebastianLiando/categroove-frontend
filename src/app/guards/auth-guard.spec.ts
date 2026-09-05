import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';

import { authGuard } from './auth-guard';
import { Mocked } from 'vitest';
import { AuthenticationService } from '../services/authentication-service';
import { Component } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({ template: '<h1>Protected Page</h1>' })
class Protected {}
@Component({ template: '<h1>Login Page</h1>' })
class Login {}

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let mockAuthService: Mocked<AuthenticationService>;
  let harness: RouterTestingHarness;

  async function setup(isAuthenticated: boolean) {
    mockAuthService = {
      isAuthenticated,
      redirectUrlAfterAuth: null,
    } as unknown as Mocked<AuthenticationService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        provideRouter([
          { path: 'protected', component: Protected, canActivate: [authGuard] },
          { path: 'login', component: Login },
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('allows navigation when user is authenticated', async () => {
    await setup(true);
    await harness.navigateByUrl('/protected', Protected);

    // The protected component should render when authenticated
    expect(harness.routeNativeElement?.textContent).toContain('Protected Page');
  });

  it('redirects to login when user is not authenticated', async () => {
    await setup(false);
    await harness.navigateByUrl('/protected', Login);

    // The login component should render after redirect
    expect(harness.routeNativeElement?.textContent).toContain('Login Page');

    // Saves the previous route as state
    expect(mockAuthService.redirectUrlAfterAuth).toBe('/protected');
  });
});
