import { GlobalErrorHandler } from './global-error-handler';
import { TestBed } from '@angular/core/testing';
import { BannerNotificationService } from '../services/banner-notification-service';
import { Mocked, vi } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalErrorHandler', () => {
  let errorHandler: GlobalErrorHandler;

  let bannerServiceMock: BannerNotificationService;

  beforeEach(() => {
    bannerServiceMock = {
      addNotification: vi.fn(),
    } as unknown as Mocked<BannerNotificationService>;

    TestBed.configureTestingModule({
      providers: [{ provide: BannerNotificationService, useValue: bannerServiceMock }],
    });

    errorHandler = TestBed.inject(GlobalErrorHandler);
  });

  it('should handle generic TypeScript errors', () => {
    let error!: RangeError;

    try {
      new Array(-1);
    } catch (e) {
      error = e as RangeError;
    }

    errorHandler.handleError(error);

    expect(bannerServiceMock.addNotification).toHaveBeenCalledWith(
      'Unknown error: RangeError',
      'Invalid array length',
      'error',
      undefined,
    );
  });

  it('should handle network error', () => {
    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad request',
    });

    errorHandler.handleError(error);

    expect(bannerServiceMock.addNotification).toHaveBeenCalledWith(
      'HTTP Error: Status 400',
      expect.stringMatching(/400.*Bad request/i),
      'error',
      undefined,
    );
  });

  it('should handle network connection error', () => {
    const error = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown error',
      url: 'https://localhost:8080/auth/login',
    });

    errorHandler.handleError(error);

    expect(bannerServiceMock.addNotification).toHaveBeenCalledWith(
      'HTTP Error: Unknown Error',
      'Please check your internet connection and try again. If the problem persists, the server is currently unreachable.',
      'error',
      undefined,
    );
  });

  it('should handle any errors not mapped to a specific handler', () => {
    class UnmappedError {}
    const error = new UnmappedError();

    errorHandler.handleError(error);

    expect(bannerServiceMock.addNotification).toHaveBeenCalledWith(
      'An unexpected error occurred',
      'We have encountered an error while processing your request. Please try again later.',
      'error',
      undefined,
    );
  });
});
