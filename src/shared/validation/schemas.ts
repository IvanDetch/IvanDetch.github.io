import * as yup from 'yup';

export const email = yup.string().trim().email('Некорректный email').required('Укажите email');
export const password = yup.string().trim().min(8, 'Пароль минимум 8 символов').required('Укажите пароль');
export const name = yup.string().trim().min(2, 'Минимум 2 символа').required('Укажите имя');
export const about = yup.string().trim().max(500, 'Максимум 500 символов').default('');
export const phone = yup
  .string()
  .trim()
  .matches(/^\+?[0-9()\-\s]{6,20}$/, 'Некорректный телефон')
  .default('');

export const price = yup.number().typeError('Цена должна быть числом').required('Укажите цену');
export const amount = yup.number().typeError('Сумма должна быть числом').required('Укажите сумму');
export const title = yup.string().trim().min(2, 'Минимум 2 символа').required('Укажите название');
export const description = yup.string().trim().min(4, 'Минимум 4 символа').required('Укажите описание');
export const category = yup.string().trim().default('');
export const image = yup.string().trim().url('Некорректный URL').default('');

export const dateISO = yup.string().trim().required('Укажите дату');
