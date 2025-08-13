import React, { memo } from 'react';
import styles from './ThemeToggle.module.css';
import { useTheme } from '../../../shared/providers/ThemeProvider/ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label="Toggle color scheme"
      title={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
};

export default memo(ThemeToggle);
