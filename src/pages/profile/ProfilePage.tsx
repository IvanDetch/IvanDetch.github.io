import React from 'react';
import '../../shared/styles/panda-tokens.css';
import ProfileForm from '../../features/forms/ProfileForm/ProfileForm';
import ChangePasswordForm from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import EmailForm from '../../features/forms/EmailForm/EmailForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Профиль</h1>
        <p>Обновите личные данные, email и пароль</p>
      </header>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Личные данные</h3>
        <ProfileForm initial={{ name: 'Иван', email: 'ivan@example.com', phone: '+7 900 123-45-67', about: '' }} />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Email</h3>
        <EmailForm />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Пароль</h3>
        <ChangePasswordForm />
      </div>
    </div>
  );
};
export default ProfilePage;
