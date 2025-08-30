import React from 'react';
import { ThemeProvider } from '../shared/providers/ThemeProvider/ThemeProvider';
import { default as LocalizationProvider } from '../shared/providers/LocalizationProvider/LocalizationProvider';
import s from './App.module.css';
import '../shared/providers/ThemeProvider/theme.css';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="theme-transition">
      <LocalizationProvider>
        <ThemeProvider>
          <div className={s.container}>
            <AppRouter />
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;