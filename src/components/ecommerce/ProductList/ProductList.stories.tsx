import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductList } from '.';
import { createRandomProduct } from '../../../lib/generators';

const meta: Meta<typeof ProductList> = {
  title: 'Components/E-commerce/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: { control: { type: 'number', min: 0, max: 1000, step: 4 } },
    pageSize: { control: { type: 'number', min: 1, max: 60, step: 1 } },
    useInfinite: { control: 'boolean' },
    unlimited: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: {
    items: 16,
    pageSize: 8,
    useInfinite: true,
    unlimited: false,
  } as any,
  render: (args) => {
    const items = Array.from({ length: (args as any).generatedCount }, () => createRandomProduct());
    return <ProductList items={items} pageSize={(args as any).pageSize} useInfinite={(args as any).useInfinite} unlimited={(args as any).unlimited} />;
  },
};
