import {TestBed} from '@angular/core/testing';

import {BannerNotificationService} from './banner-notification-service';

describe('BannerNotificationService', () => {
  let service: BannerNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerNotificationService);
  });

  it('add notification adds to list of notifications', () => {
    expect(service.notifications()).toHaveLength(0)

    service.addNotification('Title', 'Body', 'error', '.custom-icon')

    expect(service.notifications()).toHaveLength(1)

    const newNotification = service.notifications()[0]
    expect(newNotification.id).not.toBeBlank()
    expect(newNotification.title).toBe('Title')
    expect(newNotification.body).toBe('Body')
    expect(newNotification.category).toBe('error')
    expect(newNotification.icon).toBe('.custom-icon')
  });

  it('remove notification removes the correct notification', () => {
    service.addNotification('First', 'Body', 'error', '.custom-icon')
    service.addNotification('Second', 'Body', 'error', '.custom-icon')
    const firstId = service.notifications()[0].id

    service.removeNotification(firstId)
    expect(service.notifications()).toHaveLength(1)
    expect(service.notifications()[0].title).toBe('Second')
  })
});
