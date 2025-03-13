import BrowserIcon from '@assets/notification/browser.svg';
import EmailIcon from '@assets/notification/email.svg';
import TelegramIcon from '@assets/notification/telegram.svg';

export const platformSettings = [
  {
    name: 'Browser Notifications',
    description: 'Notifications directly in your browser',
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
