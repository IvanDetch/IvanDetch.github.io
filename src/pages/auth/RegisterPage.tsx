import React from 'react';
import '../../shared/styles/panda-tokens.css';
import AuthForm from '../../features/forms/AuthForm/AuthForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Регистрация</h1>
        <p>Создайте новый аккаунт</p>
      </header>
      <div className="card">
        <AuthForm initialMode="register" />
      </div>
    </div>
  );
};
export default RegisterPage;
