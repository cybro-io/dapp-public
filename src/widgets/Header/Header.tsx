'use client';

import React from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import clsx from 'clsx';

import { ConnectWallet } from '@/features/ConnectWallet';
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

type HeaderProps = {
  connectedComponent: React.ReactNode;
};

const menuItems = [
  {
    title: 'One-click',
    href: '/one-click',
  },
  {
    title: 'All Vaults',
    href: '/explore',
  },
  {
    title: 'Ai Broker',
    href: '/ai-broker',
    isComingSoon: true,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    isDisabled: false,
    shouldConnected: true,
  },
  {
    title: 'Exchange',
    href: '/exchange',
    isDisabled: false,
  },
  {
    title: 'Staking',
    href: '/staking',
  },
  {
    title: 'Claim',
    href: '/token',
    isDisabled: false,
  },
];

export const Header: ComponentWithProps<HeaderProps> = ({
  className,
  connectedComponent,
}) => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { disconnect } = useWeb3ModalDisconnect();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          {menuItems
            .filter(
              (item) =>
                item.shouldConnected === isConnected || !item.shouldConnected,
            )
            .map((item, index) => (
              <NavbarMenuItem key={item.title}>
                <MenuLink
                  href={item.href}
                  isDisabled={item.isDisabled}
                  isComingSoon={item.isComingSoon}
                >
                  {item.title}
                </MenuLink>
              </NavbarMenuItem>
            ))}
        </NavbarContent>
      </div>

      <div className="justify-end flex gap-3">
        {/*<NavbarItem className={styles.languageDropdown}>*/}
        {/*  <LanguageChange />*/}
        {/*</NavbarItem>*/}
        {/*<NavbarItem className={styles.darkModeSwitch}>*/}
        {/*  <DarkModeSwitch />*/}
        {/*</NavbarItem>*/}
        <ConnectWallet
          className={styles.connectWallet}
          size={ButtonSize.Small}
          whenConnectedComponent={connectedComponent}
        />

        {address && <Notifications address={address} />}
      </div>

      <NavbarMenu className={clsx(styles.mobileMenu)}>
        <div className={styles.mobileMenuTop}>
          {menuItems.map((item) => (
            <NavbarMenuItem className={styles.mobileMenuList} key={item.title}>
              <MenuLink
                className={styles.menuLinkMobile}
                href={item.href}
                isDisabled={item.isDisabled}
                isComingSoon={item.isComingSoon}
              >
                {item.title}
              </MenuLink>
            </NavbarMenuItem>
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
        {/*<div className={styles.mobileMenuBottom}>*/}
        {/*  <Button onClick={() => disconnect()}>Disconnect</Button>*/}
        {/*  /!*<DarkModeSwitch />*!/*/}
        {/*  /!*<LanguageChange />*!/*/}
        {/*</div>*/}
      </NavbarMenu>
    </Navbar>
  );
};
