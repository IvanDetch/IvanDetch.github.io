import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, TextAreaField } from '../../../shared/ui/forms';
import { email as emailY, name as nameY, phone as phoneY, about as aboutY } from '../../../shared/validation/schemas';

export type ProfileFormValues = yup.InferType<typeof schema>;
const schema = yup.object({
  name: nameY,
  email: emailY,
  phone: phoneY,
  about: aboutY,
});

export type ProfileFormProps = React.HTMLAttributes<HTMLFormElement> & { initial?: Partial<ProfileFormValues> };

export const ProfileForm: React.FC<ProfileFormProps> = ({ initial, ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initial?.name ?? '',
      email: initial?.email ?? '',
      phone: initial?.phone ?? '',
      about: initial?.about ?? '',
    },
  });

  const onSubmit = (v: ProfileFormValues) => {
    console.log('[ProfileForm] submit', v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <TextField label="Имя" {...register('name')} error={errors.name?.message} />
      <TextField label="Email" {...register('email')} error={errors.email?.message} />
      <TextField label="Телефон" {...register('phone')} error={errors.phone?.message} />
      <TextAreaField label="О себе" rows={4} {...register('about')} error={errors.about?.message} />
      <div className={s.actions}>
        <button type="submit" disabled={isSubmitting}>
          Сохранить
        </button>
        <button type="button" onClick={() => reset()}>
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default ProfileForm;
