import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import AddToCartButtonPattern from './AddToCartButtonPattern';

const meta: Meta<typeof AddToCartButtonPattern> = {
  title: 'Components/E-commerce/AddToCartButton (patterns)',
  component: AddToCartButtonPattern,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AddToCartButtonPattern>;

export const Uncontrolled: Story = { args: { defaultCount: 0 } };

export const Controlled: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <AddToCartButtonPattern count={count} onChange={setCount} />
        <div style={{ color: '#c00000ff' }}>Значение: {count}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setCount(0)}>reset</button>
          <button onClick={() => setCount(c => c + 1)}>++</button>
          <button onClick={() => setCount(c => Math.max(0, c - 1))}>--</button>
        </div>
      </div>
    );
  },
};
