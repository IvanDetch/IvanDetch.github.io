import React, { memo, useState } from 'react';
import styles from './ThemeToggle.module.css';
import { useTheme } from '../../../shared/providers/ThemeProvider/ThemeProvider';
import { ThemeToggleProps } from '../../types';

const ThemeToggle: React.FC<ThemeToggleProps> = ({ checked, defaultChecked = false, onChange }) => {
  const { theme, toggleTheme } = useTheme();
  const controlled = typeof checked === 'boolean';
  const [inner, setInner] = useState(defaultChecked);
  const val = controlled ? checked! : theme === 'dark';

  const onClick = () => {
    if (controlled) {
      onChange?.(!val);
    } else {
      setInner(v => !v);
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.toggle}
      aria-label="Toggle color scheme"
      title={val ? 'Светлая тема' : 'Тёмная тема'}
    >
      {val ? '🌞' : '🌙'}
    </button>
  );
};

export default memo(ThemeToggle);
