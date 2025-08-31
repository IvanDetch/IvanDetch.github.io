import React from 'react';
import s from './OperationFull.module.css';
import { OperationFullProps } from '../../../types';

const OperationFull: React.FC<OperationFullProps> = ({ operation }) => {
  const isIncome = operation.amount >= 0;
  const sign = isIncome ? '+' : '-';
  const amountCls = [s.amount, isIncome ? s.income : s.expense].join(' ');
  const formattedAmount = `${sign}${Math.abs(operation.amount).toLocaleString('ru-RU')} ₽`;
  const formattedDate = new Date(operation.date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className={s.cardFull} aria-label={'Операция подробно ' + operation.name}>
      <div className={s.header}>
        <div className={s.titleGroup}>
          <h2 className={s.title}>{operation.name}</h2>
          <div className={s.meta}>
            <span className={s.category}>{operation.category}</span>
            <time dateTime={operation.date}>{formattedDate}</time>
          </div>
        </div>
        <div className={amountCls}>{formattedAmount}</div>
      </div>
      <div className={s.row}>
        <div className={s.label}>Название</div>
        <div className={s.value}>{operation.name}</div>
      </div>
      <div className={s.row}>
        <div className={s.label}>Сумма</div>
        <div className={s.value}>{formattedAmount}</div>
      </div>
      <div className={s.row}>
        <div className={s.label}>Категория</div>
        <div className={s.value}>{operation.category}</div>
      </div>
      <div className={s.row}>
        <div className={s.label}>Дата</div>
        <div className={s.value}>
          <time dateTime={operation.date}>{formattedDate}</time>
        </div>
      </div>
      <div className={s.row}>
        <div className={s.label}>Описание</div>
        <div className={s.value}>
          <textarea className={s.textarea} disabled value={operation.description} />
        </div>
      </div>
    </section>
  );
};

export default OperationFull;
