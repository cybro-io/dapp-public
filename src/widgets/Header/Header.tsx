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
} from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';

import { ConnectWallet } from '@/features/ConnectWallet';
import ArrowIcon from '@/shared/assets/icons/arrow-dropdown-up.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import { useWeb3ModalAccount, useWeb3ModalDisconnect } from '@/shared/lib';
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
import { headerItems } from './lib/constants';
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
  const { isConnected, address } = useWeb3ModalAccount();
  const { disconnect } = useWeb3ModalDisconnect();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const items = React.useMemo(
    () => filterHeaderItems(headerItems, isConnected),
    [isConnected],
  );

  return (
    <Navbar
      className={clsx(styles.navbar, className)}
      onMenuOpenChange={setIsMenuOpen}
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
            disableRipple
            className={clsx(
              'group gap-0 p-0 bg-transparent data-[hover=true]:bg-transparent font-unbounded text-[12px] !h-fit data-[hover=true]:text-text-accent-yellow',
              isMobile && styles.menuLinkMobile,
            )}
            radius="sm"
            variant="light"
            endContent={
              <ArrowIcon className="group-data-[hover=true]:fill-text-accent-yellow rotate-180 group-aria-[expanded=true]:rotate-0 h-[17px] group-aria-[expanded=true]:h-5" />
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
            key={item.title}
            as={Link}
            href={item.href}
            className="font-unbounded text-[12px] uppercase"
          >
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
