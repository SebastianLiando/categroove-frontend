import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication-service';
import {CategrooveApiService} from './categroove-api-service';
import {Mocked, vi} from 'vitest';
import {of} from 'rxjs';
import {TokenResponse} from './model/token-response';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  const apiServiceMock = {
    login: vi.fn(),
    callback: vi.fn(),
    refreshToken: vi.fn()
  } as unknown as Mocked<CategrooveApiService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CategrooveApiService, useValue: apiServiceMock}
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('getLoginUrl calls login of api service', async () => {
    apiServiceMock.login.mockReturnValue(of("https://hostname/callback"))

    const loginUrl = await service.getLoginUrl()

    expect(apiServiceMock.login).toHaveBeenCalled()
    expect(loginUrl).toBe("https://hostname/callback")
  });

  it('login calls callback of api service and sets token', async () => {
    const mockResponse = {accessToken: "access-token", accessTokenExpiresIn: 3600} as TokenResponse
    apiServiceMock.callback.mockReturnValue(of(mockResponse))

    await service.login('code_value')

    expect(apiServiceMock.callback).toHaveBeenCalledWith('code_value')
    expect(service.accessTokenData).toEqual(mockResponse)
  });

  it('refresh token calls refresh token of api service and sets token', async () => {
    const mockResponse = {accessToken: "new-token", accessTokenExpiresIn: 3600} as TokenResponse
    apiServiceMock.refreshToken.mockReturnValue(of(mockResponse))

    await service.refreshToken()

    expect(apiServiceMock.refreshToken).toHaveBeenCalled()
    expect(service.accessTokenData).toEqual(mockResponse)
  })
});
