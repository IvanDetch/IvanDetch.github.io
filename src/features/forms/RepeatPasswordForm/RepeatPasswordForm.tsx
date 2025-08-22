import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PasswordField } from '../../../shared/ui/forms';
import { password as passwordY } from '../../../shared/validation/schemas';

const schema = yup.object({
  password: passwordY.label('Пароль'),
  repeat: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
export type RepeatPasswordValues = yup.InferType<typeof schema>;

export const RepeatPasswordForm: React.FC<React.HTMLAttributes<HTMLFormElement>> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RepeatPasswordValues>({
    resolver: yupResolver(schema),
    defaultValues: { password: '', repeat: '' },
  });
  const onSubmit = (v: RepeatPasswordValues) => {
    console.log('[RepeatPasswordForm] submit', v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      <PasswordField className={''} label="Пароль" {...register('password')} error={errors.password?.message} />
      <PasswordField className={''} label="Повторите пароль" {...register('repeat')} error={errors.repeat?.message} />
      <div className={s.actions}>
        <button type="submit" disabled={isSubmitting}>
          Подтвердить
        </button>
        <button type="button" onClick={() => reset()}>
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default RepeatPasswordForm;
