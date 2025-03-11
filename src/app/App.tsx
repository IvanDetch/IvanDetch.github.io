import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='App-body'>
          <h1>Иван Комраков</h1>
          <p>
            <strong>Цель: </strong>
            <span>Хочу приобрести/структурировать новые знания и навыки о React, чтобы применить их на работе.</span>
          </p>
          <p>
            <strong>Технологии: </strong>
            <ul>
              <li>JavaScript (ES6), jQuery, HTML, CSS3 (препроцессоры SCSS/SASS), Bootstrap, PHP 7.3+, Laravel 8+ .</li>
              <li>Частичная работа с React 18, Node.js.</li>
              <li>Rest API.</li>
              <li>Сборщики: Laravel mix. React vite/WebPack .</li>
              <li>Composer, NPM, Kubernets, Docker.</li>
              <li>SQL(MySQL,MariaDB), MongoDB.</li>
              <li>Git, GitLab, GitLab CI/CD.</li>
              <li>CMS WordPress.</li>
              <li>Figma, Jira.</li>
            </ul>
          </p>
          <p>
            <strong>Опыт: </strong>
            <span>Имею опыт работы в области веб-разработки (профессиональный опыт 7 лет), обладаю знаниями и навыками верстки, Frontend и Backend-технологий.</span>
          </p>
          <p>
          <strong>Контакты: </strong>
          <span>kmrakvi@gmail.com</span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
