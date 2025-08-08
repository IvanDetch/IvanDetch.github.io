import React from 'react';
import Logo from '../../ui/Logo/Logo';
import { HeaderProps } from '../../types';
import s from './Header.module.css';


const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`${s.headerWrapper} ${className || ''}`}>
      <div className={s.headerContainer}>
        <div className={s.logoBlock}>
          <Logo size="medium" />
        </div>
        {children && <div className={s.navContent}>{children}</div>}
      </div>
    </header>
  );
};

export default Header;