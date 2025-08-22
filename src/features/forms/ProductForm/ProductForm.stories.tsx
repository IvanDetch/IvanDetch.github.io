import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProductForm from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'Features/Forms/ProductForm (RHF+Yup)',
  component: ProductForm,
  tags: ['autodocs'],
  args: {
    mode: 'create',
    initial: {
      name: 'Demo',
      description: 'Описание',
      price: 1999 as any,
      image: 'https://picsum.photos/seed/x/320/240',
      category: 'electronics',
    },
  },
  argTypes: { mode: { control: 'radio', options: ['create', 'edit'] } },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ProductForm>;
export const Default: Story = {
  render: (args) => (
    <div key={JSON.stringify(args)}>
      <ProductForm {...args} />
    </div>
  ),
};
