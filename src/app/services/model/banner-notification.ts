export type BannerNotificationCategory = 'success' | 'error' | 'info'

export interface BannerNotification {
  id: string
  title: string
  body: string
  category: BannerNotificationCategory
  timestamp: Date
  icon?: string
}
