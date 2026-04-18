import { GlobalErrorHandlerStrategy } from './global-error-handler.strategy';
import { ErrorHandlerModel } from '../models/error-handler-model';

export class UnmappedHandlerErrorHandlerStrategy implements GlobalErrorHandlerStrategy<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleError(error: unknown): ErrorHandlerModel {
    return {
      body: 'We have encountered an error while processing your request. Please try again later.',
      title: 'An unexpected error occurred',
      category: 'error',
    };
  }
}
