import TransactionFull from './TransactionFull';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TransactionFull> = {
  title: 'Components/Finance/Transaction/TransactionFull',
  component: TransactionFull,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    amount: { control: 'number', description: 'Сумма операции' },
    category: { control: 'text', description: 'Категория' },
    title: { control: 'text', description: 'Название операции' },
    description: { control: 'text', description: 'Описание операции' },
    date: { control: 'date', description: 'Дата операции' },
    maxDescriptionLength: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: 'Максимальная длина описания',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionFull>;

export const IncomeTransaction: Story = {
  args: {
    amount: 200000,
    category: 'Зарплата',
    title: 'Перевод от работодателя',
    description: 'Зарплата за август 2025 года, включая премию за успешный проект.',
    date: new Date('2025-08-01').toISOString(),
    maxDescriptionLength: 60,
  },
};

export const ExpenseTransaction: Story = {
  args: {
    amount: -4600,
    category: 'Коммунальные услуги',
    title: 'Оплата ЖКХ',
    description: 'Платёж за июль: электричество, вода, газ и вывоз мусора.',
    date: new Date('2025-07-31').toISOString(),
    maxDescriptionLength: 60,
  },
};