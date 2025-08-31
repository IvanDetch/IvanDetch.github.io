import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: { translation: {
    hello: 'Привет',
    theme: 'Тема',
    language: 'Язык',
    openModal: 'Открыть модалку',
    nav: { home: 'Главная', about: 'О нас', contacts: 'Контакты', products: 'Товары', operations: 'Операции', cart: 'Корзина', profile: 'Профиль' },
    header: { title: 'Мой проект', dashboard: 'Дашборд' },
    layout: { contentTitle: 'Добро пожаловать', contentText: 'Это основной контент страницы.' },
    products: { title: 'Товары', addToCart: 'В корзину', addNewProduct: 'Добавить товар', editProduct: 'Редактировать'},
    operations: { title: 'Операции', addOperation: 'Добавить операцию', editOperation: 'Редактировать' },
  }},
  en: { translation: {
    hello: 'Hello',
    theme: 'Theme',
    language: 'Language',
    openModal: 'Open modal',
    nav: { home: 'Home', about: 'About', contacts: 'Contacts', products: 'Products', operations: 'Operations', cart: 'Cart', profile: 'Profile' },
    header: { title: 'My Project', dashboard: 'Dashboard' },
    layout: { contentTitle: 'Welcome', contentText: 'This is the main content area.' },
    products: { title: 'Products', addToCart: 'To cart', addNewProduct: 'Add product', editProduct: 'Edit'},
    operations: { title: 'Operations', addOperation: 'Add operation', editOperation: 'Edit'},
  }},
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
