import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import OperationForm from './OperationForm';

const meta: Meta<typeof OperationForm> = {
  title: 'Features/Forms/OperationForm (RHF+Yup)',
  component: OperationForm,
  tags: ['autodocs'],
  args: {
    mode: 'create',
    initial: {
      title: 'Оплата интернета',
      amount: 600 as any,
      type: 'expense',
      category: 'Коммуналка',
      date: new Date().toISOString().slice(0, 10),
      note: '',
    },
  },
  argTypes: { mode: { control: 'radio', options: ['create', 'edit'] } },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof OperationForm>;
export const Default: Story = {
  render: (args) => (
    <div key={JSON.stringify(args)}>
      <OperationForm {...args} />
    </div>
  ),
};
