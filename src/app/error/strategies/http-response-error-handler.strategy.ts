import { GlobalErrorHandlerStrategy } from './global-error-handler.strategy';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerModel } from '../models/error-handler-model';

export class HttpResponseErrorHandlerStrategy implements GlobalErrorHandlerStrategy<HttpErrorResponse> {
  handleError(error: HttpErrorResponse): ErrorHandlerModel {
    let title = `HTTP Error: Status ${error.status}`;
    let details = error.message;

    if (error.status === 0) {
      title = 'HTTP Error: Unknown Error';
      details =
        'Please check your internet connection and try again. If the problem persists, the server is currently unreachable.';
    }

    return {
      title: title,
      body: details,
      category: 'error',
    };
  }
}
