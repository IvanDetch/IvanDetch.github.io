import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AutoOpenModal from '../../components/ui/Modal/AutoOpenModal';
import ProductForm from '../../features/forms/ProductForm/ProductForm';

export const NewProductModal: React.FC = () => {
  const navigate = useNavigate();
  const onClose = () => navigate('/products');
  return (
    <AutoOpenModal onClose={onClose} title="Новый товар">
      <ProductForm mode="create" />
    </AutoOpenModal>
  );
};

export const EditProductModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const onClose = () => navigate('/products');
  return (
    <AutoOpenModal onClose={onClose} title={`Редактирование товара #${id}`}>
      <ProductForm mode="edit" initial={{ name: 'Demo '+id, description: '...', price: 1234, image: '', category: '' }} />
    </AutoOpenModal>
  );
};

