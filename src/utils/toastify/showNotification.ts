import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { notificationBackgroundStyles } from './notificationStyles.ts';
import type { INotification } from '../../types/interfaces.ts';

export const showNotification = ({
  text,
  type = 'info',
  duration = 3000,
  position = 'right',
}: INotification) => {
  Toastify({
    text,
    duration,
    gravity: 'top',
    position,
    close: true,
    stopOnFocus: true,
    style: {
      background: notificationBackgroundStyles[type],
    },
  }).showToast();
};
