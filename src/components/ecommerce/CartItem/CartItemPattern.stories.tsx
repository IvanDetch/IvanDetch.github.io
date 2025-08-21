import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import CartItemPattern from './CartItemPattern';
import { CartItem as CartItemType } from '../../types';

const meta: Meta<typeof CartItemPattern> = {
    title: 'Components/E-commerce/CartItem (patterns)',
    tags: ['autodocs'],
    component: CartItemPattern,
    parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof CartItemPattern>;

const sample: CartItemType = {
    name: 'Larry Carlton X6 Headless 6 Trans Black',
    description: 'Headless Electric Guitar with 6 Strings',
    price: 65162.53,
    image: 'https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/19832399.jpg',
    category: 'Headless Guitars',
    quantity: 1,
} as any;

export const Uncontrolled: Story = {
    render: () => <CartItemPattern item={sample} defaultQuantity={1} onRemove={() => console.log('remove')} />,
};

export const Controlled: Story = {
    render: () => {
        const [qty, setQty] = useState(2);
        return <CartItemPattern item={{ ...sample }} quantity={qty} onQuantityChange={setQty} onRemove={() => setQty(0)} />;
    },
};

export const WithCustomActions: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <CartItemPattern
        item={{ ...sample }}
        quantity={qty}
        onQuantityChange={setQty}
        onRemove={() => setQty(0)}
        renderActions={({ value, inc, dec, remove }) => (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={dec}>-</button>
            <span style={{ color: 'black' }}>{value}</span>
            <button onClick={inc}>+</button>
            <button onClick={remove}>Удалить</button>
          </div>
        )}
      />
    );
  },
};
