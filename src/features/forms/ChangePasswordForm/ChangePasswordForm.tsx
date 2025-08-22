import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PasswordField } from '../../../shared/ui/forms';
import { password as passwordY } from '../../../shared/validation/schemas';

const schema = yup.object({
  newPassword: passwordY.label('Новый пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
    .required('Повторите пароль'),
  currentPassword: passwordY.label('Текущий пароль'),
});
export type ChangePasswordValues = yup.InferType<typeof schema>;

export const ChangePasswordForm: React.FC<React.HTMLAttributes<HTMLFormElement>> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', repeatPassword: '' },
  });
  const onSubmit = (v: ChangePasswordValues) => {
    console.log('[ChangePasswordForm] submit', v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      <PasswordField
        className={''}
        label="Текущий пароль"
        {...register('currentPassword')}
        error={errors.currentPassword?.message}
      />
      <PasswordField
        className={''}
        label="Новый пароль"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />
      <PasswordField
        className={''}
        label="Повторите пароль"
        {...register('repeatPassword')}
        error={errors.repeatPassword?.message}
      />
      <div className={s.actions}>
        <button type="submit" disabled={isSubmitting}>
          Обновить пароль
        </button>
        <button type="button" onClick={() => reset()}>
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default ChangePasswordForm;
