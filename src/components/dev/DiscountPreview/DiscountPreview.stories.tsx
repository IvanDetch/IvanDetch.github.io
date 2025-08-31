import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DiscountPreview from './DiscountPreview';

const meta: Meta<typeof DiscountPreview> = {
  title: 'Dev/DiscountPreview (AccountService)',
  component: DiscountPreview,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DiscountPreview>;
export const Default: Story = { render: () => <DiscountPreview /> };
