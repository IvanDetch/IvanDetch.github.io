import React, { memo } from 'react';
import { LayoutProps } from '../../types';
import { Header } from '../Header';
import s from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`${s.layoutWrapper} ${className || ''}`}>
      <Header />
      <main className={s.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default memo(Layout);