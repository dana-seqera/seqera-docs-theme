import React, { type ComponentProps, type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type { Props } from '@theme/Navbar/Layout';

import styles from './styles.module.css';

import SeqeraHeader from './SeqeraHeader';
import custom from './styles.custom.module.css';
import useMediaQuery from './SeqeraHeader/hooks/useMediaQuery';
import { useColorMode } from '@docusaurus/theme-common';
import Sun from './SeqeraHeader/HeaderDesktop/NavItems/images/SunIcon.svg';
import Moon from './SeqeraHeader/HeaderDesktop/NavItems/images/MoonIcon.svg';

function Container({ children, isMobile }) {
  if (isMobile) return children;
  return (
    <div className={custom.siteHeader}>
      <div className="tw-wrapper">
        <div className={custom.seqeraHeader}>
          <SeqeraHeader theme="dark" />
        </div>
        {/* Navbar normally goes here.
      Docusaurus expects a classname, so we have a dummy element
      with zero dimensions and display:none in main.css.
      See https://github.com/facebook/docusaurus/issues/7505 

      Note - navbar is used for mobile styles, so CSS
      only hides it on bigger screens.
      */}
        {/* <div className="navbar" /> */}
      </div>
    </div>
  );
}

export default function NavbarLayout({ children }: Props): ReactNode {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const isMobile = useMediaQuery('(max-width: 995px)');

  return (
    <Container isMobile={isMobile}>
      <nav
        ref={navbarRef}
        aria-label={translate({
          id: 'theme.NavBar.navAriaLabel',
          message: 'Main',
          description: 'The ARIA label for the main navigation',
        })}
        className={clsx(
          ThemeClassNames.layout.navbar.container,
          'navbar',
          'navbar--fixed-top',
          hideOnScroll && [styles.navbarHideable, !isNavbarVisible && styles.navbarHidden],
          {
            'navbar--dark': style === 'dark',
            'navbar--primary': style === 'primary',
            'navbar-sidebar--show': mobileSidebar.shown,
          }
        )}
      >
        {children}

        <NavbarMobileSidebar />
      </nav>
    </Container>
  );
}
