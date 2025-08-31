import React from 'react';
import s from './TransactionBrief.module.css';
import { TransactionBrief as TransactionBriefProps } from '../../../types';

const TransactionBrief: React.FC<TransactionBriefProps> = ({
  amount,
  category,
  title,
  description,
  maxDescriptionLength = 60,
}) => {
  const isPositive = amount > 0;
  const sign = isPositive ? '+' : '-';
  const formattedAmount = `${sign}${Math.abs(amount).toLocaleString('ru-RU')} ₽`;
  const truncatedDesc = description.length > maxDescriptionLength
    ? description.slice(0, maxDescriptionLength) + '...'
    : description;

  return (
    <div className={s.cardBrief}>
      <div className={s.header}>
        <div className={s.titleGroup}>
          <h4 className={s.title}>{title}</h4>
          <span className={s.category}>{category}</span>
        </div>
        <div className={`${s.amount} ${isPositive ? s.income : s.expense}`}>
          {formattedAmount}
        </div>
      </div>
      {description && <p className={s.description}>{truncatedDesc}</p>}
    </div>
  );
};
export default TransactionBrief;