import { BannerNotification } from '../../services/model/banner-notification';

export type ErrorHandlerModel = Pick<BannerNotification, 'title' | 'body' | 'category' | 'icon'>;
