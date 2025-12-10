'use client';

import React from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button as NextUiButton,
} from '@heroui/react';
import { useFlag } from '@unleash/proxy-client-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ConnectWallet } from '@/features/ConnectWallet';
import ArrowIcon from '@/shared/assets/icons/arrow-dropdown-up.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import { Flag, useAppKitAccount, useAppKitDisconnect } from '@/shared/lib';
import { ComponentWithProps } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  Logo,
  MenuLink,
  Socials,
} from '@/shared/ui';
import { Notifications } from '@/widgets/Notifications';

import styles from './Header.module.scss';
import { headerItems, AI_BROKER_PAGE_TITLE } from './lib/constants';
import type { HeaderItem } from './lib/constants';

type HeaderProps = {
  connectedComponent: React.ReactNode;
};

const filterHeaderItems = (headerItems: HeaderItem[], isConnected = false) =>
  headerItems.filter(
    (item) => item.shouldConnected === isConnected || !item.shouldConnected,
  );

export const Header: ComponentWithProps<HeaderProps> = ({
  className,
  connectedComponent,
}) => {
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useAppKitDisconnect();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isEnabledAiBroker = useFlag(Flag.aiBrokerPage);

  const items = React.useMemo(() => {
    const filteredItems = filterHeaderItems(headerItems, isConnected);

    const aiBrokerIndex = filteredItems.findIndex(
      ({ title }) => title === AI_BROKER_PAGE_TITLE,
    );

    if (aiBrokerIndex !== -1) {
      filteredItems[aiBrokerIndex].isComingSoon = !isEnabledAiBroker;
    }

    return filteredItems;
  }, [isConnected, isEnabledAiBroker]);

  return (
    <Navbar
      height={52}
      className={clsx(styles.navbar, className)}
      isMenuOpen={isMenuOpen}
    >
      <div className={styles.menuContainer}>
        <NavbarContent className={styles.leftContainer}>
          <NavbarMenuToggle
            icon={isMenuOpen ? CloseIcon : MenuIcon}
            className={clsx(
              styles.burgerButton,
              isMenuOpen && styles.menuOpened,
              'text-default',
            )}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
          <NavbarBrand>
            <Logo className={styles.logo} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className={styles.desktopMenu}>
          {items.map((item) => (
            <HeaderItem key={item.title} item={item} />
          ))}
        </NavbarContent>
      </div>

      <div className="justify-end flex gap-3">
        <ConnectWallet
          className={styles.connectWallet}
          size={ButtonSize.Small}
          whenConnectedComponent={connectedComponent}
        />

        {address && <Notifications address={address} />}
      </div>

      <NavbarMenu className={clsx(styles.mobileMenu)}>
        <div className={styles.mobileMenuTop}>
          {items.map((item) => (
            <HeaderItem key={item.title} item={item} isMobile={true} />
          ))}
          <Socials />
          <ConnectWallet
            whenConnectedComponent={
              <Button view={ButtonView.Primary} onClick={() => disconnect()}>
                Disconnect
              </Button>
            }
          />
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

const HeaderItem = ({
  item,
  isMobile = false,
}: {
  item: HeaderItem;
  isMobile?: boolean;
}) => {
  const pathname = usePathname();

  if (!item.children) {
    return (
      <NavbarMenuItem
        key={item.title}
        className={isMobile ? styles.mobileMenuList : undefined}
      >
        <MenuLink
          className={isMobile ? styles.menuLinkMobile : undefined}
          href={item.href}
          isDisabled={item.isDisabled}
          isComingSoon={item.isComingSoon}
          isBeta={item.isBeta}
        >
          {item.title}
        </MenuLink>
      </NavbarMenuItem>
    );
  }

  if (isMobile) {
    return item.children.map((childrenItem) => (
      <NavbarMenuItem
        key={childrenItem.title}
        className={clsx(isMobile && styles.mobileMenuList)}
      >
        <MenuLink
          className={clsx(isMobile && styles.menuLinkMobile)}
          href={childrenItem.href}
          isDisabled={childrenItem.isDisabled}
          isComingSoon={childrenItem.isComingSoon}
        >
          {item.title}&nbsp;
          <span className="text-text-accent-yellow">{childrenItem.title}</span>
        </MenuLink>
      </NavbarMenuItem>
    ));
  }

  return (
    <Dropdown classNames={{ content: 'bg-black' }}>
      <NavbarItem>
        <DropdownTrigger>
          <NextUiButton
            data-selected={item.children?.some((item) =>
              pathname.includes(item.href),
            )}
            disableRipple
            className={clsx(
              'rounded-none group gap-0 py-0.5 px-1 bg-transparent data-[selected=true]:text-black data-[selected=true]:bg-white data-[hover=true]:bg-transparent font-unbounded text-[12px] h-[19px] data-[hover=true]:text-text-accent-yellow',
              isMobile && styles.menuLinkMobile,
            )}
            radius="sm"
            variant="light"
            endContent={
              <ArrowIcon className="outline-none group-data-[selected=true]:fill-black group-data-[hover=true]:fill-text-accent-yellow rotate-180 group-aria-[expanded=true]:rotate-0 h-[17px] group-aria-[expanded=true]:h-5" />
            }
          >
            {item.title}
          </NextUiButton>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label={item.title}
        itemClasses={{
          base: 'gap-4',
        }}
      >
        {item.children?.map((item) => (
          <DropdownItem
            key={item.href}
            as={Link}
            href={item.href}
            className={clsx(
              'font-unbounded text-[12px] uppercase',
              pathname.includes(item.href) &&
                'bg-default pointer-events-none cursor-default',
            )}
          >
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
