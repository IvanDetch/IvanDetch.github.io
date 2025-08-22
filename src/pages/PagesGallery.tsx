import React, { useState } from 'react';
import '../shared/styles/panda-tokens.css';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ProfilePage from './profile/ProfilePage';
import ProductEditorPage from './products/ProductEditorPage';
import OperationEditorPage from './operations/OperationEditorPage';

const tabs = [
  { key: 'login', title: 'Вход', node: <LoginPage /> },
  { key: 'register', title: 'Регистрация', node: <RegisterPage /> },
  { key: 'profile', title: 'Профиль', node: <ProfilePage /> },
  { key: 'product', title: 'Товар', node: <ProductEditorPage /> },
  { key: 'operation', title: 'Операция', node: <OperationEditorPage /> },
];

const PagesGallery: React.FC = () => {
  const [active, setActive] = useState('login');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`btn ${active === t.key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActive(t.key)}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.key === active)?.node}</div>
    </div>
  );
};
export default PagesGallery;
