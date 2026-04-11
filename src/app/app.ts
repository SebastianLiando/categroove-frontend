import {Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BannerNotificationService} from './services/banner-notification-service';
import {BannerNotification} from './banner-notification/banner-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('categroove-frontend');
  private readonly bannerNotificationService = inject(BannerNotificationService);

  sortedNotifications = computed(() => {
    const clone = structuredClone(this.bannerNotificationService.notifications())
    return clone.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  })

  removeNotification(id: string) {
    this.bannerNotificationService.removeNotification(id)
  }
}
