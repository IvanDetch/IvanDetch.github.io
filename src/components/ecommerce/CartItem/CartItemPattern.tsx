import React, { useState, memo } from 'react';
import s from './CartItem.module.css';
import { CartItemEnhancedProps } from '../../types';

const CartItemPattern: React.FC<CartItemEnhancedProps> = ({
    item,
    quantity,
    defaultQuantity,
    onQuantityChange,
    onRemove,
    disableRemove = false,
    renderActions,
}) => {
    const { name, description, price, image } = item;
    const controlled = typeof quantity === 'number';
    const [inner, setInner] = useState<number>(
        defaultQuantity ?? (item as any).quantity ?? 1
    );
    const value = controlled ? (quantity as number) : inner;

    const set = (next: number) => {
        const n = Math.max(0, next);
        if (!controlled) setInner(n);
        onQuantityChange?.(n);
    };
    const inc = () => set(value + 1);
    const dec = () => set(value - 1);
    const remove = () => onRemove?.();

    const totalPrice = price * value;

    return (
        <div className={s.itemContainer} role="group" aria-label={`Товар ${name}`}>
            <div className={s.imageContainer}>
                <img src={image} alt={name} className={s.productImage} />
            </div>
            <div className={s.details}>
                <div className={s.headerRow}>
                    <h3 className={s.title}>{name}</h3>
                    {!disableRemove && (
                        <button
                            type="button"
                            className={s.removeButton}
                            onClick={remove}
                            aria-label={`Удалить ${name} из корзины`}
                        >
                            ❌
                        </button>
                    )}
                </div>

                <div className={s.description}>
                    <h3 className={s.descriptionTitle}>Описание:</h3>
                    <p className={s.descriptionText}>{description}</p>
                </div>

                <div className={s.footerRow}>
                    <div className={s.quantity}>
                        Количество:{' '}
                        <span className={s.quantityValue} aria-live="polite">
                            {value}
                        </span>
                    </div>

                    <div className={s.actions}>
                        {renderActions ? (
                            renderActions({ value, inc, dec, remove })
                        ) : (
                            <div className={s.counterWrapper}>
                                <button
                                    className={s.changeButton}
                                    onClick={dec}
                                    aria-label="Уменьшить количество"
                                >
                                    -
                                </button>
                                <div className={s.counter}>{value}</div>
                                <button
                                    className={s.changeButton}
                                    onClick={inc}
                                    aria-label="Увеличить количество"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={s.priceInfo}>
                        <div className={s.unitPrice}>{price.toLocaleString('ru-RU')} ₽ за шт.</div>
                        <div className={s.totalPrice}>{totalPrice.toLocaleString('ru-RU')} ₽</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CartItemPattern);
