import React from 'react';
import '../../shared/styles/panda-tokens.css';
import ProductForm from '../../features/forms/ProductForm/ProductForm';

const ProductEditorPage: React.FC = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Товар</h1>
        <p>Создание/редактирование товара</p>
      </header>
      <div className="card">
        <ProductForm
          mode="edit"
          initial={{
            name: 'Demo',
            description: 'Описание',
            price: 1999 as any,
            image: 'https://picsum.photos/seed/x/320/240',
            category: 'electronics',
          }}
        />
      </div>
    </div>
  );
};
export default ProductEditorPage;
