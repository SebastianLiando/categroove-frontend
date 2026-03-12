import {TestBed} from '@angular/core/testing';

import {CategrooveApiService} from './categroove-api-service';
import {provideHttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

describe('CategrooveApiService', () => {
  let httpTesting: HttpTestingController
  let service: CategrooveApiService;

  const loginResponse = 'https://accounts.spotify.com/authorize/?client_id=client-id&response_type=code&scope=playlist-modify-public playlist-modify-private&redirect_uri=https://hostname/spotify/callback/'
  const tokenResponse = {"accessToken": "access-token", "accessTokenExpiresIn": 3600}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CategrooveApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login works', async () => {
    const redirectUrlPromise = firstValueFrom(service.login())

    const req = httpTesting.expectOne(req => req.url.includes('/auth/login'))
    expect(req.request.method).toBe('GET')

    req.flush(loginResponse)

    expect(await redirectUrlPromise).toBe(loginResponse);
    httpTesting.verify()
  })

  it('callback works', async () => {
    const tokenPromise = firstValueFrom(service.callback('code_value'))

    const req = httpTesting.expectOne(req => req.url.includes('/auth/callback'))
    expect(req.request.method).toBe('GET')
    expect(req.request.params.get('code')).toBe('code_value')

    req.flush(tokenResponse)

    expect(await tokenPromise).toEqual({accessToken: 'access-token', accessTokenExpiresIn: 3600})
    httpTesting.verify()
  })

  it('refresh token sends with credentials', async () => {
    const tokenPromise = firstValueFrom(service.refreshToken())

    const req = httpTesting.expectOne(req => req.url.includes('/auth/refresh') && req.withCredentials)
    expect(req.request.method).toBe('POST')

    req.flush(tokenResponse)

    expect(await tokenPromise).toEqual({accessToken: 'access-token', accessTokenExpiresIn: 3600})
    httpTesting.verify()
  })
});
