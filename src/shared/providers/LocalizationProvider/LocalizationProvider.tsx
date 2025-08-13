import React from 'react';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LocalizationProvider;
