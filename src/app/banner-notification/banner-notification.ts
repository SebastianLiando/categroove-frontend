import {Component, computed, input, output} from '@angular/core';
import {BannerNotification as BannerNotificationModel} from '../services/model/banner-notification';
import {Card} from 'primeng/card';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Button} from 'primeng/button';
import {Avatar} from 'primeng/avatar';
import {map, timer} from 'rxjs';
import {formatDistanceToNowStrict} from 'date-fns';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-banner-notification',
  imports: [
    Card,
    Accordion,
    AccordionHeader,
    AccordionContent,
    AccordionPanel,
    Button,
    Avatar,
    AsyncPipe
  ],
  templateUrl: './banner-notification.html',
  styleUrl: './banner-notification.css',
})
export class BannerNotification {
  notification = input.required<BannerNotificationModel>()
  notificationClose = output<string>()

  notificationIcon = computed(() => {
    switch (this.notification().category) {
      case "info":
        return "pi pi-info-circle"
      case "error":
        return "pi pi-exclamation-circle"
      case "success":
        return "pi pi-check-circle"
    }
  })

  notificationTextColor = computed(() => {
    switch (this.notification().category) {
      case "info":
        return "dark:text-blue-300"
      case "error":
        return "dark:text-red-300"
      case "success":
        return "dark:text-green-300"
    }
  })

  notificationIconColor = computed(() => {
    switch (this.notification().category) {
      case "info":
        return `dark:bg-blue-900 ${this.notificationTextColor()}`
      case "error":
        return `dark:bg-red-900 ${this.notificationTextColor()}`
      case "success":
        return `dark:bg-green-900 ${this.notificationTextColor()}`
    }
  })

  notificationBorderColor = computed(() => {
    switch (this.notification().category) {
      case "info":
        return "dark:border-blue-300"
      case "error":
        return "dark:border-red-300"
      case "success":
        return "dark:border-green-300"
    }
  })

  notificationDistanceFromNow = timer(0, 60000)
    .pipe(map(() => {
      const formatted = formatDistanceToNowStrict(this.notification().timestamp, {addSuffix: true})
      return formatted.includes('second') ? 'just now' : formatted
    }))

  closeNotification(event: Event) {
    event.stopPropagation()
    this.notificationClose.emit(this.notification().id)
  }
}
