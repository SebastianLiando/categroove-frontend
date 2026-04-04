import {TestBed} from '@angular/core/testing';
import {CanActivateFn, provideRouter} from '@angular/router';
import {routes} from '../app.routes'

import {loginCallbackGuard} from './login-callback-guard';
import {RouterTestingHarness} from '@angular/router/testing';
import {provideLottieOptions} from 'ngx-lottie';
import {AuthenticationService} from '../services/authentication-service';

describe('loginCallbackGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginCallbackGuard(...guardParameters));

  let harness: RouterTestingHarness;

  const authServiceMock = {
    login: vi.fn().mockResolvedValue(undefined)
  }

  async function setup() {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideLottieOptions({
          player: vi.fn().mockImplementation(() => ({
            useWebWorker: vi.fn(),
            loadAnimation: vi.fn()
          }))
        }),
        {provide: AuthenticationService, useValue: authServiceMock}
      ]
    })

    harness = await RouterTestingHarness.create()
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it.each([undefined, '', '   '])('redirects to login if code query parameter is %s', async (code) => {
    await setup()

    if (code === undefined) {
      await harness.navigateByUrl('/login/callback')
    } else {
      await harness.navigateByUrl(`/login/callback?code=${code}`)
    }

    expect(harness.routeNativeElement?.textContent).toContain('Continue with Spotify')
  })

  it('allows navigation to login callback page with non-blank code query parameter', async () => {
    await setup()

    await harness.navigateByUrl('/login/callback?code=test-code')

    expect(harness.routeNativeElement?.textContent).not.toContain('Continue with Spotify')
    expect(harness.routeNativeElement?.textContent).toContain('Authenticating with Spotify...')
  })
});
