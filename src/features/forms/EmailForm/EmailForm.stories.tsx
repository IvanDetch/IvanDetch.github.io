import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import EmailForm from './EmailForm';

const meta: Meta<typeof EmailForm> = {
  title: 'Features/Forms/EmailForm (RHF+Yup)',
  component: EmailForm,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof EmailForm>;
export const Default: Story = { render: () => <EmailForm /> };
