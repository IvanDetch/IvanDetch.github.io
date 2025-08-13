import React from 'react';
import { Header } from '../components/layout/Header';
import { ThemeProvider } from '../shared/providers/ThemeProvider/ThemeProvider';
import { default as LocalizationProvider } from '../shared/providers/LocalizationProvider/LocalizationProvider';
import logo from './logo.svg';
import s from './App.module.css';
import '../shared/providers/ThemeProvider/theme.css';

function App() {
  return (
    <div className="theme-transition">
      <LocalizationProvider>
        <ThemeProvider>
          <div className={s.container}>
            <Header />
            <div className={s.content}>
              <img src={logo} className={s.logo} alt="logo" />
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
