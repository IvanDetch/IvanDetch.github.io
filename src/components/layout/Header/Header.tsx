import React, { memo } from 'react';
import Logo from '../../ui/Logo/Logo';
import { HeaderProps, Sizes } from '../../types';
import s from './Header.module.css';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LanguageToggle from '../../ui/LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';


const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { t } = useTranslation();
  return (
    <header className={`${s.headerWrapper} ${className || ''}`}>
      <div className={s.headerContainer}>
        <div className={s.logoBlock}>
          <Logo size={Sizes.medium} />
        </div>
        {children || <nav className={s.navContent}>
          <a href="#home">{t('nav.home')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#contacts">{t('nav.contacts')}</a>
        </nav>}
        <div className={s.controls}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);