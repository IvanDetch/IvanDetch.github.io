
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Operation } from '.';
import type { Operation as OperationType } from '../../../types';

const meta: Meta<typeof Operation> = {
  title: 'Components/Finance/Operations/Operation',
  component: Operation,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof Operation>;

export const Playground: Story = {
  args: {
    operation: {
      id: 'op-1',
      name: 'Оплата подписки',
      amount: -499,
      category: 'Подписка',
      description: 'Списание за месяц сервиса',
      date: new Date().toISOString(),
    } as OperationType,
  },
};
