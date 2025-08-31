import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '../../../shared/ui/forms';
import { email as emailY } from '../../../shared/validation/schemas';

const schema = yup.object({ email: emailY });
export type EmailFormValues = yup.InferType<typeof schema>;

export const EmailForm: React.FC<React.HTMLAttributes<HTMLFormElement>> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  });
  const onSubmit = (v: EmailFormValues) => {
    console.log('[EmailForm] submit', v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...props}>
      <TextField label="Email" {...register('email')} error={errors.email?.message} />
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
export default EmailForm;
