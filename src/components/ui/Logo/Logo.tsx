import React, { FC } from 'react';
import s from './Logo.module.css';
import { LogoProps, Sizes } from '../../types';
import { useTranslation } from 'react-i18next';

const Logo: React.FC<LogoProps> = ({ size = Sizes.medium }) => {
  const { t } = useTranslation();
  return (
    <div className={`${s.logoContainer} ${s[size]}`}>
      <div className={s.logoCircle}></div>
      <span className={s.logoText}>{t('header.title')}</span>
    </div>
  );
};

export default Logo;
