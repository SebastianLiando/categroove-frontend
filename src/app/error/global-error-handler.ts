import { ErrorHandler, inject, Injectable } from '@angular/core';
import { BannerNotificationService } from '../services/banner-notification-service';
import { GlobalErrorHandlerFactory } from './global-error-handler.factory';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(BannerNotificationService);
  private readonly errorHandlerFactory = inject(GlobalErrorHandlerFactory);

  handleError(error: unknown): void {
    const strategy = this.errorHandlerFactory.getStrategy(error);

    const errorHandlerModel = strategy.handleError(error);
    const { title, body, category, icon } = errorHandlerModel;

    this.notificationService.addNotification(title, body, category, icon);

    console.error(error);
  }
}
