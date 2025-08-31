import React from 'react';
import s from './CartItem.module.css';
import { CartItemProps } from '../../types';

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { name, description, price, image, quantity } = item;
  const totalPrice = price * quantity;

  const handleRemove = () => alert(`Удалить ${name} из корзины`);

  return (
    <div className={s.itemContainer}>
      <div className={s.imageContainer}>
        <img src={image} alt={name} className={s.productImage} />
      </div>

      <div className={s.details}>
        <div className={s.headerRow}>
          <h4 className={s.title}>{name}</h4>
          <button
            className={s.removeBtn}
            title="Удалить из корзины"
            aria-label={`Удалить ${name}`}
            onClick={handleRemove}
          >
            ❌
          </button>
        </div>

        <p className={s.description}>{description}</p>

        <div className={s.footerRow}>
          <div className={s.quantity}>
            Количество: <span className={s.quantityValue}>{quantity}</span>
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
export default CartItem;