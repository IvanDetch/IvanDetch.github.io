import React, { FC } from 'react';
import s from './Logo.module.css';
import { LogoProps, Sizes } from '../../types';

const Logo: React.FC<LogoProps> = ({ size = Sizes.medium }) => {
  return (
    <div className={`${s.logoContainer} ${s[size]}`}>
      <div className={s.logoCircle}></div>
      <span className={s.logoText}>MyBrand</span>
    </div>
  );
};

export default Logo;
