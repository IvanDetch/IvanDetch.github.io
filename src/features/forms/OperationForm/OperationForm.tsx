import React from 'react';
import s from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, TextAreaField, SelectField } from '../../../shared/ui/forms';
import {
  title as titleY,
  amount as amountY,
  category as categoryY,
  dateISO as dateY,
} from '../../../shared/validation/schemas';

const schema = yup.object({
  title: titleY,
  amount: amountY,
  type: yup.mixed<'income' | 'expense'>().oneOf(['income', 'expense']).required(),
  category: categoryY,
  date: dateY,
  note: yup.string().trim().default(''),
});
export type OperationFormValues = yup.InferType<typeof schema>;

export type OperationFormProps = React.HTMLAttributes<HTMLFormElement> & {
  initial?: Partial<OperationFormValues>;
  mode?: 'create' | 'edit';
};

export const OperationForm: React.FC<OperationFormProps> = ({ initial, mode = 'create', ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OperationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initial?.title ?? '',
      amount: (initial?.amount as any) ?? '',
      type: (initial?.type as any) ?? 'expense',
      category: initial?.category ?? '',
      date: initial?.date ?? new Date().toISOString().slice(0, 10),
      note: initial?.note ?? '',
    },
  });

  const onSubmit = (v: OperationFormValues) => {
    console.log('[OperationForm] %s', mode, v);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <TextField label="Название операции" {...register('title')} error={errors.title?.message} />
      <TextField label="Сумма" {...register('amount')} error={errors.amount?.message} />
      <SelectField
        label="Тип"
        {...register('type' as const)}
        defaultValue="expense"
        error={errors.type?.message as any}
      >
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
      </SelectField>
      <TextField label="Категория" {...register('category')} error={errors.category?.message} />
      <TextField label="Дата" type="date" {...register('date')} error={errors.date?.message} />
      <TextAreaField label="Комментарий" rows={3} {...register('note')} error={errors.note?.message} />
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
export default OperationForm;
