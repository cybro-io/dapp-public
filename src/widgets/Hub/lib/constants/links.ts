import { links, socialLinks, verifiedLinks } from '@/shared/lib';
import AssureDefiImage from '@assets/audits/assure-defi.png';
import CertikImage from '@assets/audits/certik.png';
import PessimisticImage from '@assets/audits/pessimistic.png';
import QuillAuditsImage from '@assets/audits/quill-audits.png';
import ArbitrumPortalIcon from '@assets/featured/arbitrum-portal.svg';
import CoingeckoIcon from '@assets/featured/coingecko.svg';
import CoinMarketCapIcon from '@assets/featured/coinmarketcap.svg';
import DefillamaIcon from '@assets/featured/defillama.svg';
import TrustPilotIcon from '@assets/featured/trustpilot.svg';
import DebankIcon from '@assets/socials/debank.svg';
import DiscordIcon from '@assets/socials/discord-34.svg';
import MediumIcon from '@assets/socials/medium.svg';
import TelegramIcon from '@assets/socials/telegram-34.svg';
import XIcon from '@assets/socials/x.svg';

export const verifiedMap = [
  {
    name: 'AssureDefi',
    image: AssureDefiImage,
    link: verifiedLinks.assureDefi,
  },
  { name: 'Certik', image: CertikImage, link: verifiedLinks.certik },
  {
    name: 'QuillAudits',
    image: QuillAuditsImage,
    link: verifiedLinks.quillAudits,
  },
  {
    name: 'Pessimistic',
    image: PessimisticImage,
    link: verifiedLinks.pessimisticAudit,
  },
];

export const featuredInMap = [
  {
    name: 'CoinGecko',
    image: CoingeckoIcon,
    link: links.coingecko,
    order: 'order-4',
  },
  {
    name: 'DefiLlama',
    image: DefillamaIcon,
    link: links.defillama,
    order: 'order-1',
  },
  {
    name: 'Arbitrum Portal',
    image: ArbitrumPortalIcon,
    link: links.arbitrumPortal,
    order: 'order-2',
  },
  {
    name: 'CoinMarketCap',
    image: CoinMarketCapIcon,
    link: links.cmc,
    order: 'order-3',
  },
  {
    name: 'TrustPilot',
    image: TrustPilotIcon,
    link: links.trustPilot,
    order: 'order-5',
  },
];

export const socialsMap = [
  { name: 'X', image: XIcon, link: socialLinks.x },
  { name: 'Discord', image: DiscordIcon, link: socialLinks.discord },
  { name: 'Telegram', image: TelegramIcon, link: socialLinks.telegram },
  { name: 'Medium', image: MediumIcon, link: socialLinks.medium },
  { name: 'DeBank', image: DebankIcon, link: socialLinks.debank },
];
