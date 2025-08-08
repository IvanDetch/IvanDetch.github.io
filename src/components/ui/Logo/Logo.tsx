import React, { FC } from 'react';
import s from './Logo.module.css';
import { LogoProps } from '../../types';

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  return (
    <div className={`${s.logoContainer} ${s[size]}`}>
      <div className={s.logoCircle}></div>
      <span className={s.logoText}>MyBrand</span>
    </div>
  );
};

export default Logo;
