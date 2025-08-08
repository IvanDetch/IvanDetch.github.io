import React from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { ProductFullProps } from '../../types';
import s from './ProductFull.module.css';

const ProductFull: React.FC<ProductFullProps> = ({ product }) => {
  const { name, description, price, image, category } = product;

  return (
    <article className={s.productFull}>
      <div className={s.imageSection}>
        <div className={s.imageContainer}>
          <img src={image} alt={name} className={s.productImage} />
        </div>
      </div>

      <div className={s.details}>
        <div className={s.headerRow}>
          <div className={s.category}>{category}</div>
          <h1 className={s.title}>{name}</h1>
        </div>

        <div className={s.description}>
          <h3 className={s.descriptionTitle}>Описание:</h3>
          <p className={s.descriptionText}>{description}</p>
        </div>

        <div className={s.bottomRow}>
            <div className={s.unitPrice}>{price.toLocaleString('ru-RU')} ₽</div>
            <div className={s.actions}>
                <AddToCartButton count={0} />
            </div>
        </div>
      </div>
    </article>
  );
};
export default ProductFull;