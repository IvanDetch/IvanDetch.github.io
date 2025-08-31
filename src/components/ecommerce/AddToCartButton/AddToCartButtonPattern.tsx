import React, { forwardRef, useState } from 'react';
import s from './AddToCartButton.module.css';
import { AddToCartButtonExtendedProps } from '../../types';

const AddToCartButtonPattern = forwardRef<HTMLButtonElement, AddToCartButtonExtendedProps>(function AddToCartButtonPattern(
  { count, defaultCount = 0, background, onChange, onAdd, onIncrease, onDecrease },
  ref
) {
  const controlled = typeof count === 'number';
  const [inner, setInner] = useState<number>(defaultCount);
  const value = controlled ? (count as number) : inner;

  const set = (next: number) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  const handleAdd = () => {
    onAdd?.();
    set(1);
  };

  const handleIncrease = () => {
    onIncrease?.();
    set(value + 1);
  };

  const handleDecrease = () => {
    onDecrease?.();
    set(Math.max(0, value - 1));
  };

  if (value === 0) {
    return (
      <button
        ref={ref}
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
      <div className={s.counter} aria-live="polite">{value}</div>
      <button
        ref={ref}
        className={s.changeButton}
        aria-label="Увеличить количество"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
});

export default AddToCartButtonPattern;
