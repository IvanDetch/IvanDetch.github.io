import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeProducts } from '../../lib/demoData';
import { ProductListPattern } from '../../components/ecommerce/ProductList';
import { ProductBrief } from '../../components/ecommerce/ProductBrief';
import { AddToCartButton } from '../../components/ecommerce/AddToCartButton';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const items = React.useMemo(()=> makeProducts(24), []);
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Товары</h2>
        <Link to="/products/new" state={{ backgroundLocation: location }} className="btn btn-primary">Добавить товар</Link>
      </div>
      <ProductListPattern
        items={items as any}
        pageSize={8}
        useInfinite
        renderItem={(p: any) => (
          <ProductBrief product={p}>
            <AddToCartButton count={0} />
            <Link to={`/products/${p.id}/edit`} state={{ backgroundLocation: location }} className="btn btn-ghost">Редактировать</Link>
          </ProductBrief>
        )}
      />
    </div>
  );
};
export default ProductsPage;
