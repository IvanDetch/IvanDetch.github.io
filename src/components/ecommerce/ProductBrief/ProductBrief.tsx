import React from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { ProductBriefProps } from '../../types';
import s from './ProductBrief.module.css';

const ProductBrief: React.FC<ProductBriefProps & React.HTMLAttributes<HTMLDivElement>> = ({ product, maxDescriptionLength = 80, children, ...rest }) => {
  const { name, description, price, image } = product;

  const truncatedDesc =
    description.length > maxDescriptionLength 
    ? description.slice(0, maxDescriptionLength) + '...'
    : description;

  return (
    <div className={s.productBrief}>
      <div className={s.imageContainer}>
        <img src={image} alt={name} className={s.productImage} />
      </div>

      <div className={s.details}>
        <h4 className={s.title}>{name}</h4>
        <p className={s.description}>
            {truncatedDesc}
        </p>

        <div className={s.footerRow}>
          <div className={s.unitPrice}>{price.toLocaleString('ru-RU')} ₽</div>
          <div className={s.addCartButton}>{children ?? <AddToCartButton count={0} />}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductBrief;