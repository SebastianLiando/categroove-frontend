import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BannerNotification} from './banner-notification';
import {
  BannerNotification as BannerNotificationModel,
  BannerNotificationCategory
} from '../services/model/banner-notification';

describe('BannerNotification', () => {
  let component: BannerNotification;
  let fixture: ComponentFixture<BannerNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerNotification]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BannerNotification);
    component = fixture.componentInstance;
  });

  const toggleExpand = async () => {
    fixture.nativeElement.querySelector('.p-accordionheader').click()
    await fixture.whenStable()
  }

  it('can expand and collapse to show and hide notification details', async () => {
    const notification: BannerNotificationModel = {
      id: '1',
      title: 'Welcome to Categroove!',
      body: 'Your journey to better music management starts here.',
      category: 'info',
      timestamp: new Date()
    }

    fixture.componentRef.setInput('notification', notification)
    await fixture.whenStable()

    const notificationDetails = fixture.nativeElement.querySelector('.p-accordioncontent-content')

    expect(getComputedStyle(notificationDetails).visibility).toBe('hidden')
    await toggleExpand()
    await expect.poll(() => getComputedStyle(notificationDetails).visibility).toBe('visible')
    await toggleExpand()
    await expect.poll(() => getComputedStyle(notificationDetails).visibility).toBe('hidden')
  });

  it('renders notification data', async () => {
    const notification: BannerNotificationModel = {
      id: '1',
      title: 'Welcome to Categroove!',
      body: 'Your journey to better music management starts here.',
      category: 'info',
      timestamp: new Date()
    }

    fixture.componentRef.setInput('notification', notification)
    await fixture.whenStable()

    const header = fixture.nativeElement.querySelector('.p-accordionheader')
    expect(header.textContent).toContain('Welcome to Categroove!')

    const content = fixture.nativeElement.querySelector('.p-accordioncontent-content')
    expect(content.textContent).toContain('Your journey to better music management starts here.')
  })

  it.each([['info', '.pi-info-circle'], ['error', '.pi-exclamation-circle'], ['success', '.pi-check-circle']])('renders %s icon for %s category', async (category, iconClass) => {
    const notification: BannerNotificationModel = {
      id: '1',
      title: 'Test',
      body: 'Test',
      category: category as BannerNotificationCategory,
      timestamp: new Date()
    }

    fixture.componentRef.setInput('notification', notification)
    await fixture.whenStable()

    const icon = fixture.nativeElement.querySelector(iconClass)
    expect(icon).not.toBeNull()
  })

  it('closes the correct notification when close button is clicked', async () => {
    const notification: BannerNotificationModel = {
      id: '1',
      title: 'Test',
      body: 'Test',
      category: 'info',
      timestamp: new Date()
    }

    let notificationIdToClose = null
    component.notificationClose.subscribe(id => {
      notificationIdToClose = id
    })

    fixture.componentRef.setInput('notification', notification)
    await fixture.whenStable()

    const closeBtn = fixture.nativeElement.querySelector('.pi-times')
    closeBtn.click()
    await fixture.whenStable()

    expect(notificationIdToClose).toBe('1')
  })
});
