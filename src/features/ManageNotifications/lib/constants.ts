import BrowserIcon from '@assets/notification/browser.svg';
import EmailIcon from '@assets/notification/email.svg';
import TelegramIcon from '@assets/notification/telegram.svg';

export const platformSettings = [
  {
    name: 'Push Notifications',
    description: 'Notifications directly in your application',
    isComing: false,
    Icon: BrowserIcon,
  },
  {
    name: 'Telegram Bot',
    description: 'Get updates via Telegram',
    isComing: true,
    Icon: TelegramIcon,
  },
  {
    name: 'Email',
    description: 'Receive updates in your inbox',
    isComing: true,
    Icon: EmailIcon,
  },
];
