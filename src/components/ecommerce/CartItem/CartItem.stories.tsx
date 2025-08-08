import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';
import { CartItemProps } from '../../types';

const meta: Meta<typeof CartItem> = {
    title: 'Components/E-commerce/CartItem',
    component: CartItem,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        item: { control: 'object' },
    },
};

export default meta;
type Story = StoryObj<typeof CartItem>;

const exampleItem: CartItemProps['item'] = {
    name: 'Larry Carlton X6 Headless 6 Trans Black',
    description: 'Headless Electric Guitar with 6 Strings',
    price: 65162.53,
    image: 'https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/19832399.jpg',
    category: 'Headless Guitars',
    quantity: 1,
};

export const SingleItem: Story = {
    args: {
        item: exampleItem,
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример с одним товаром в корзине',
            },
        },
    },
};
export const MultipleQty: Story = {
  args: {
    item: { ...exampleItem, quantity: 3 },
  },
};