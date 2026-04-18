import { ErrorHandlerModel } from '../models/error-handler-model';

export interface GlobalErrorHandlerStrategy<T> {
  handleError(error: T): ErrorHandlerModel;
}
