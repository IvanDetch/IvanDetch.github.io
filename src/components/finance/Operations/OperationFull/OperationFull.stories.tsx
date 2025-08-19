
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { OperationFull } from '.';
import type { Operation as OperationType } from '../../../types';

const meta: Meta<typeof OperationFull> = {
  title: 'Components/Finance/Operations/OperationFull',
  component: OperationFull,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof OperationFull>;

export const Playground: Story = {
  args: {
    operation: {
      id: 'op-2',
      name: 'Зачисление средств',
      amount: 27500,
      category: 'Поступление',
      description: 'Возврат средств по заказу',
      date: new Date().toISOString(),
    } as OperationType,
  },
};
