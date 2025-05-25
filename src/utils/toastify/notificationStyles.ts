import type { NotificationType } from '../../types/types';

export const notificationBackgroundStyles: Record<NotificationType, string> = {
  success: 'linear-gradient(to right, #00b09b, #96c93d)',
  error: 'linear-gradient(to right, #e52d27, #b31217)',
  info: 'linear-gradient(to right, #2196f3, #21cbf3)',
};
