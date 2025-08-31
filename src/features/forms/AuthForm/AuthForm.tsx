import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, PasswordField } from '../../../shared/ui/forms';
import { email as emailY, name as nameY, password as passwordY } from '../../../shared/validation/schemas';

const loginSchema = yup.object({ email: emailY, password: passwordY });
const registerSchema = yup.object({
  name: nameY,
  email: emailY,
  password: passwordY,
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});

export type AuthFormValues = {
  mode: 'login' | 'register';
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export type AuthFormProps = React.HTMLAttributes<HTMLFormElement> & { initialMode?: 'login' | 'register' };

export const AuthForm: React.FC<AuthFormProps> = ({ initialMode = 'login', ...rest }) => {
  const [mode, setMode] = React.useState<'login' | 'register'>(initialMode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormValues>({
    resolver: yupResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: { mode: initialMode, name: '', email: '', password: '', confirm: '' },
  });

  const onSubmit = (v: AuthFormValues) => {
    console.log('[AuthForm] submit', { ...v, mode });
    reset({ mode, name: '', email: '', password: '', confirm: '' });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <div className={s.inline}>
        <label className={s.label}>
          <input type="radio" checked={mode === 'login'} onChange={() => setMode('login')} /> Вход
        </label>
        <label className={s.label}>
          <input type="radio" checked={mode === 'register'} onChange={() => setMode('register')} /> Регистрация
        </label>
      </div>

      {mode === 'register' && <TextField label="Имя" {...register('name')} error={errors.name?.message} />}
      <TextField label="Email" {...register('email')} error={errors.email?.message} />
      <PasswordField className={''} label="Пароль" {...register('password')} error={errors.password?.message} />
      {mode === 'register' && (
        <PasswordField
          className={''}
          label="Повторите пароль"
          {...register('confirm')}
          error={errors.confirm?.message}
        />
      )}

      <div className={s.actions}>
        <button type="submit" disabled={isSubmitting}>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        <button type="button" onClick={() => reset({ mode, name: '', email: '', password: '', confirm: '' })}>
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default AuthForm;
