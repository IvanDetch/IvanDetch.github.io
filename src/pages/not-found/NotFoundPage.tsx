import React from 'react';
import { Link } from 'react-router-dom';
import s from './not_found.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <div className={s.code}>404</div>
        <div className={s.title}>Страница не найдена</div>
        <div className={s.text}>Кажется, вы перешли по неправильной ссылке.</div>
        <Link to="/" className={s.home}>На главную</Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
