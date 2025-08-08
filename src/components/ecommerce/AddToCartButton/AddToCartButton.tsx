import React from 'react';
import s from './AddToCartButton.module.css';
import { AddToCartButtonProps } from '../../types';

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ count = 0, background }) => {
    const handleAdd = () => alert('Товар добавлен в корзину');
    const handleIncrease = () => alert('Увеличить количество');
    const handleDecrease = () => alert('Уменьшить количество');
    if (count === 0) {
        return (
            <button 
                className={s.addButton}
                style={{ background }} 
                onClick={handleAdd}
            >
                В корзину
            </button>
        );
    }

    return (
        <div className={s.counterWrapper}>
            <button
                className={s.changeButton}
                aria-label="Уменьшить количество"
                onClick={handleDecrease}
            >
                -
            </button>
            <div className={s.counter}>{count}</div>
            <button
                className={s.changeButton}
                aria-label="Увеличить количество"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};

export default AddToCartButton;