import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';

const meta: Meta<typeof ChangePasswordForm> = {
  title: 'Features/Forms/ChangePasswordForm (RHF+Yup)',
  component: ChangePasswordForm,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ChangePasswordForm>;
export const Default: Story = { render: () => <ChangePasswordForm /> };
