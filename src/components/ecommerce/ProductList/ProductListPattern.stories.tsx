import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { ProductListPattern } from '.';
import { Product } from '../../types';
import { AddToCartButton } from '../AddToCartButton';
import { ProductBrief } from '../ProductBrief';

const meta: Meta<typeof ProductListPattern> = {
  title: 'Components/E-commerce/ProductList (patterns)',
  component: ProductListPattern,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: { control: { type: 'number', min: 0, max: 120, step: 4 } },
    pageSize: { control: { type: 'number', min: 1, max: 48, step: 1 } },
    useInfinite: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ProductListPattern>;

function makeProduct(i: number): Product {
  return {
    name: 'Demo ' + i,
    description: 'Описание товара ' + i,
    price: 1000 + i,
    image: 'https://picsum.photos/seed/p' + i + '/320/240',
    category: i % 2 ? 'electronics' : 'home',
  };
}

export const Default: Story = {
  args: { items: 30, pageSize: 8, useInfinite: true } as any,
  render: (args) => {
    const all = useMemo(() => Array.from({ length: (args as any).items }, (_, i) => makeProduct(i + 1)), [args]);
    return (
      <ProductListPattern
        items={all}
        pageSize={(args as any).pageSize}
        useInfinite={(args as any).useInfinite}
        renderItem={(p) => (
          <ProductBrief product={p}>
            <AddToCartButton count={0} />
          </ProductBrief>
        )}
      />
    );
  },
};
