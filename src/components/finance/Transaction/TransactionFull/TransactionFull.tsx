/* eslint-disable prettier/prettier */
import React from 'react';
import s from './TransactionFull.module.css';
import { TransactionFull as TransactionFullProps } from '../../../types';

const TransactionFull: React.FC<TransactionFullProps> = ({
    amount,
    category,
    title,
    description,
    date,
    maxDescriptionLength = 60,
}) => {
    const isIncome = amount > 0;
    const sign = isIncome ? '+' : '-';
    const formattedAmount = `${sign}${Math.abs(amount).toLocaleString('ru-RU')} ₽`;
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    const truncatedDesc = description.length > maxDescriptionLength
    ? description.slice(0, maxDescriptionLength) + '...'
    : description;

    return (
        <div className={s.cardFull}>
            <div className={s.header}>
                <div className={s.titleGroup}>
                    <h2 className={s.title}>{title}</h2>
                    <div className={s.meta}>
                        <span className={s.category}>{category}</span>
                        <span className={s.date}>{formattedDate}</span>
                    </div>
                </div>
                <div className={s.actions}>
                    <div className={`${s.amount} ${isIncome ? s.income : s.expense}`}>
                        {formattedAmount}
                    </div>
                    <button
                        className={s.editButton}
                        title="Редактировать операцию"
                        onClick={() => alert('Редактировать операцию')}
                    >
                        ✏️
                    </button>
                </div>
            </div>
            {description && (
                <div className={s.descriptionBlock}>
                    <h4 className={s.descriptionTitle}>Описание:</h4>
                    <p className={s.descriptionText}>{truncatedDesc}</p>
                </div>
            )}
        </div>
    );
};
export default TransactionFull;