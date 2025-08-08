import type { Meta, StoryObj } from '@storybook/react';
import TransactionBrief from './TransactionBrief';

const meta: Meta<typeof TransactionBrief> = {
  title: 'Components/Finance/Transaction/TransactionBrief',
  component: TransactionBrief,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    amount: {
      control: { type: 'number' },
      description: 'Сумма операции',
    },
    category: {
      control: 'text',
      description: 'Категория',
    },
    title: {
      control: 'text',
      description: 'Название операции',
    },
    description: {
      control: 'text',
      description: 'Описание операции',
    },
    maxDescriptionLength: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: 'Максимальная длина описания',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionBrief>;

export const IncomeTransaction: Story = {
  args: {
    amount: 200000,
    category: 'Зарплата',
    title: 'Перевод от работодателя',
    description: 'Получена зарплата за август.',
    maxDescriptionLength: 60,
  },
};

export const ExpenseTransaction: Story = {
  args: {
    amount: -2750,
    category: 'Еда',
    title: 'Покупка в магазине',
    description: 'Купил продукты в супермаркете на неделю: овощи, фрукты, мясо, хлеб и молочные продукты.',
    maxDescriptionLength: 60,
  },
};