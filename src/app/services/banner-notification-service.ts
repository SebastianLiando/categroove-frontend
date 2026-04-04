import {Injectable, signal} from '@angular/core';
import {BannerNotification, BannerNotificationCategory} from './model/banner-notification';

@Injectable({
  providedIn: 'root',
})
export class BannerNotificationService {
  private readonly _notifications = signal<BannerNotification[]>([])

  get notifications() {
    return this._notifications.asReadonly()
  }

  addNotification(title: string, body: string, category: BannerNotificationCategory = 'info', icon?: string) {
    const notification: BannerNotification = {
      id: crypto.randomUUID(),
      title: title,
      body: body,
      category: category,
      timestamp: new Date(),
      icon: icon
    }

    this._notifications.update(notifications => [...notifications, notification])
  }

  removeNotification(id: string) {
    this._notifications.update(notifications => notifications.filter(notification => notification.id !== id))
  }
}
