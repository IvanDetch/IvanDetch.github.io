import React from 'react';
import '../../shared/styles/panda-tokens.css';
import AuthForm from '../../features/forms/AuthForm/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Вход</h1>
        <p>Используйте ваш email и пароль</p>
      </header>
      <div className="card">
        <AuthForm initialMode="login" />
      </div>
    </div>
  );
};
export default LoginPage;
