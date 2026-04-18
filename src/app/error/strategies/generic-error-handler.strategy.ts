import { ErrorHandlerModel } from '../models/error-handler-model';
import { GlobalErrorHandlerStrategy } from './global-error-handler.strategy';

export class GenericErrorHandlerStrategy implements GlobalErrorHandlerStrategy<Error> {
  handleError(error: Error): ErrorHandlerModel {
    return {
      title: `Unknown error: ${error.name}`,
      body: error.message,
      category: 'error'
    };
  }
}
