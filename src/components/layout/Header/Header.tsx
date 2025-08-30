import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../ui/Logo/Logo';
import { HeaderProps, Sizes } from '../../types';
import s from './Header.module.css';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LanguageToggle from '../../ui/LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { t } = useTranslation();
  const cls = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.navLink} ${s.active}` : s.navLink;

  return (
    <header className={`${s.headerWrapper} ${className || ''}`}>
      <div className={s.headerContainer}>
        <div className={s.logoBlock}>
          <Logo size={Sizes.medium} />
        </div>

        {children || (
          <nav className={s.navContent}>
            <NavLink to="/" end className={cls}>
              {t('nav.home', 'Главная')}
            </NavLink>
            <NavLink to="/products" className={cls}>
              {t('nav.products', 'Товары')}
            </NavLink>
            <NavLink to="/operations" className={cls}>
              {t('nav.operations', 'Операции')}
            </NavLink>
            <NavLink to="/cart" className={cls}>
              {t('nav.cart', 'Корзина')}
            </NavLink>
            <NavLink to="/profile" className={cls}>
              {t('nav.profile', 'Профиль')}
            </NavLink>
          </nav>
        )}

        <div className={s.controls}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);