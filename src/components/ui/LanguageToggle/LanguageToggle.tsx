import React, { memo }  from 'react';
import styles from './LanguageToggle.module.css';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const next = i18n.language === 'ru' ? 'en' : 'ru';
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => i18n.changeLanguage(next)}
      title={`Switch to ${next.toUpperCase()}`}
      aria-label={`Switch language to ${next.toUpperCase()}`}
    >
      {i18n.language.toUpperCase()}
    </button>
  );
};

export default memo(LanguageToggle);