import { GenericErrorHandlerStrategy } from './strategies/generic-error-handler.strategy';
import { GlobalErrorHandlerStrategy } from './strategies/global-error-handler.strategy';
import { HttpResponseErrorHandlerStrategy } from './strategies/http-response-error-handler.strategy';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnmappedHandlerErrorHandlerStrategy } from './strategies/unmapped-handler-error-handler.strategy';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerFactory {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private readonly errorHandlers = new Map<Function, GlobalErrorHandlerStrategy<unknown>>();
  private readonly defaultErrorHandler = new GenericErrorHandlerStrategy();
  private readonly unmappedErrorHandler = new UnmappedHandlerErrorHandlerStrategy();

  constructor() {
    this.errorHandlers.set(HttpErrorResponse, new HttpResponseErrorHandlerStrategy());
  }

  getStrategy(error: unknown): GlobalErrorHandlerStrategy<unknown> {
    if (error === undefined || error === null) {
      return this.unmappedErrorHandler;
    }

    const handler = this.errorHandlers.get((error as object).constructor);
    if (handler !== undefined) {
      return handler;
    }

    if (error instanceof Error) {
      return this.defaultErrorHandler;
    } else {
      return this.unmappedErrorHandler;
    }
  }
}
