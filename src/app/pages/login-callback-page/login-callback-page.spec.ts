import {TestBed} from '@angular/core/testing';

import {LoginCallbackPage} from './login-callback-page';
import {provideLottieOptions} from 'ngx-lottie';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {RouterTestingHarness} from '@angular/router/testing';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';

describe('LoginCallbackPage', () => {
  let component: LoginCallbackPage
  let spyLocation: SpyLocation
  let harness: RouterTestingHarness
  let httpTesting: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCallbackPage],
      providers: [
        provideLottieOptions({
          player: vi.fn().mockImplementation(() => ({
            useWebWorker: vi.fn(),
            loadAnimation: vi.fn()
          }))
        }),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {provide: Location, useClass: SpyLocation}
      ]
    })
      .compileComponents();

    harness = await RouterTestingHarness.create()
    httpTesting = TestBed.inject(HttpTestingController)
    spyLocation = TestBed.inject(Location) as SpyLocation
  });

  it('should receive code query parameter', async () => {
    component = await harness.navigateByUrl('/login/callback?code=test-code', LoginCallbackPage)

    expect(harness.routeNativeElement?.textContent).toContain('Authenticating with Spotify...')
    expect(component.code()).toBe('test-code');
  });

  it('successful call to backend with code should redirect to dashboard', async () => {
    await harness.navigateByUrl('/login/callback?code=test-code')

    const req = httpTesting.expectOne(req => req.urlWithParams.includes('/auth/callback?code=test-code'))
    expect(req.request.method).toBe('GET')

    req.flush('{"accessToken": "access-token","accessTokenExpiresIn": 3600}')
    await harness.fixture.whenStable()
    harness.detectChanges()

    // TODO: Implement assertion for redirect to dashboard when dashboard page and routing are implemented

    httpTesting.verify()
  })

  it('failed call to backend with code should go back to previous page', async () => {
    const backSpy = vi.spyOn(spyLocation, 'back')
    await harness.navigateByUrl('/login/callback?code=test-code')

    const req = httpTesting.expectOne(req => req.urlWithParams.includes('/auth/callback?code=test-code'))
    expect(req.request.method).toBe('GET')

    req.flush('', {status: 500, statusText: 'Mock Error'})
    await harness.fixture.whenStable()
    harness.detectChanges()

    // The back() method is called after the promise is resolved
    await expect.poll(() => backSpy).toHaveBeenCalledOnce()

    httpTesting.verify()
  })
});
