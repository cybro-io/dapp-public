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
import { useWeb3ModalDisconnect } from '@/shared/lib';
import { ComponentWithProps } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  Logo,
  MenuLink,
  Socials,
} from '@/shared/ui';

import styles from './Header.module.scss';

type HeaderProps = {
  connectedComponent: React.ReactNode;
};

const menuItems = [
  {
    title: 'Vaults',
    href: '/vaults',
  },
  {
    title: 'One-click',
    href: '/one-click',
    isComingSoon: true,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    isDisabled: false,
  },
  {
    title: 'Exchange',
    href: '/exchange',
    isDisabled: false,
  },
  {
    title: 'Cybro Points',
    href: '/5',
    isDisabled: true,
  },
];

export const Header: ComponentWithProps<HeaderProps> = ({
  className,
  connectedComponent,
}) => {
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
          {menuItems.map((item, index) => (
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

      <div className="justify-end">
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
      </div>

      <NavbarMenu className={clsx(styles.mobileMenu)}>
        <div className={styles.mobileMenuTop}>
          {menuItems.map((item, index) => (
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
