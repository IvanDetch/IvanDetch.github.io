import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: { translation: {
    hello: 'Привет',
    theme: 'Тема',
    language: 'Язык',
    openModal: 'Открыть модалку',
    nav: { home: 'Главная', about: 'О нас', contacts: 'Контакты' },
    header: { title: 'Мой проект', dashboard: 'Дашборд' },
    layout: { contentTitle: 'Добро пожаловать', contentText: 'Это основной контент страницы.' },
  }},
  en: { translation: {
    hello: 'Hello',
    theme: 'Theme',
    language: 'Language',
    openModal: 'Open modal',
    nav: { home: 'Home', about: 'About', contacts: 'Contacts' },
    header: { title: 'My Project', dashboard: 'Dashboard' },
    layout: { contentTitle: 'Welcome', contentText: 'This is the main content area.' },
  }},
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
