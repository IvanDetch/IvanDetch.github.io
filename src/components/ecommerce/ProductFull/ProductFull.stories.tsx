import type { Meta, StoryObj } from '@storybook/react';
import ProductFull from './ProductFull';
import { ProductFullProps } from '../../types';

const meta: Meta<typeof ProductFull> = {
    title: 'Components/E-commerce/ProductFull',
    component: ProductFull,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ProductFull>;

const exampleProductFull: ProductFullProps['product'] = {
    name: 'Larry Carlton X6 Headless 6 Trans Black',
    description: 'Stirring into the innovative world of instruments, Sire produces its own headless guitars. The new X6 offers a combination of modern sleek design and exceptional functionality, constructed with a lightweight build (approximately 6–7 lbs.) to ensure playing at ease. The X6 delivers a powerful and dynamic sound, making it a perfect choice for any players who want to go trendy without compromising performance. Available in 6 and 7-string variants.',
    price: 65162.53,
    image: 'https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/19832399.jpg',
    category: 'Headless Guitars',
};

export const Default: Story = {
    args: {
        product: exampleProductFull,
    },
    parameters: {
        docs: {
            description: {
                story: 'Детальная страница смартфона с полным описанием',
            },
        },
    },
};