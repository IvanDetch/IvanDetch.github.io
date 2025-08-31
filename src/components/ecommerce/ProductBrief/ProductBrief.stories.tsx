import type { Meta, StoryObj } from '@storybook/react';
import ProductBrief from './ProductBrief';
import { ProductBriefProps } from '../../types';

const meta: Meta<typeof ProductBrief> = {
  title: 'Components/E-commerce/ProductBrief',
  component: ProductBrief,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    product: { control: 'object' },
    maxDescriptionLength: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Максимальная длина описания',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductBrief>;

const exampProductBrief: ProductBriefProps['product'] = {
    name: 'Larry Carlton X6 Headless 6 Trans Black',
    description: 'Headless Electric Guitar with 6 Strings',
    price: 65162.53,
    image: 'https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/19832399.jpg',
    category: 'Headless Guitars',
};

export const Default: Story = {
  args: {
    product: exampProductBrief,
    maxDescriptionLength: 80,
  },
};
export const LongText: Story = {
  args: {
    product: exampProductBrief,
    maxDescriptionLength: 30,
  },
};