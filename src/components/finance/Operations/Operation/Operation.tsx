import React from 'react';
import s from './Operation.module.css';
import { OperationItemProps } from '../../../types';

const Operation: React.FC<OperationItemProps> = ({ operation }) => {
  const isIncome = operation.amount >= 0;
  const sign = isIncome ? '+' : '-';
  const amountCls = [s.amount, isIncome ? s.income : s.expense].join(' ');
  const formattedAmount = `${sign}${Math.abs(operation.amount).toLocaleString('ru-RU')} ₽`;
  const dt = new Date(operation.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <article className={s.card} aria-label={'Операция ' + operation.name}>
      <div className={s.header}>
        <h3 className={s.title}>{operation.name}</h3>
        <div className={amountCls}>{formattedAmount}</div>
      </div>
      <div className={s.meta}>
        <span className={s.category}>{operation.category}</span>
        <time dateTime={operation.date}>{dt}</time>
      </div>
      {operation.description && <p className={s.desc}>{operation.description}</p>}
    </article>
  );
};
export default Operation;
