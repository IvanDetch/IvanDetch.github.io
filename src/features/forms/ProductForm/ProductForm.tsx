import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, TextAreaField } from '../../../shared/ui/forms';
import {
  title as titleY,
  description as descY,
  price as priceY,
  image as imageY,
  category as categoryY,
} from '../../../shared/validation/schemas';

const schema = yup.object({
  name: titleY,
  description: descY,
  price: priceY,
  image: imageY,
  category: categoryY,
});
export type ProductFormValues = yup.InferType<typeof schema>;

export type ProductFormProps = React.HTMLAttributes<HTMLFormElement> & {
  initial?: Partial<ProductFormValues>;
  mode?: 'create' | 'edit';
};

export const ProductForm: React.FC<ProductFormProps> = ({ initial, mode = 'create', ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initial?.name ?? '',
      description: initial?.description ?? '',
      price: (initial?.price as any) ?? '',
      image: initial?.image ?? '',
      category: initial?.category ?? '',
    },
  });

  const onSubmit = (v: ProductFormValues) => {
    console.log('[ProductForm] %s', mode, v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <TextField label="Название" {...register('name')} error={errors.name?.message} />
      <TextField label="Цена" {...register('price')} error={errors.price?.message} />
      <TextField label="Категория" {...register('category')} error={errors.category?.message} />
      <TextField label="Ссылка на изображение" {...register('image')} error={errors.image?.message} />
      <TextAreaField label="Описание" rows={4} {...register('description')} error={errors.description?.message} />
      <div className={s.actions}>
        <button type="submit" disabled={isSubmitting}>
          {mode === 'edit' ? 'Обновить' : 'Создать'}
        </button>
        <button type="button" onClick={() => reset()}>
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default ProductForm;
