import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AuthForm from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Features/Forms/AuthForm (RHF+Yup)',
  component: AuthForm,
  tags: ['autodocs'],
  args: { initialMode: 'login' },

  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof AuthForm>;
export const Default: Story = {
  render: (args) => (
    <div key={JSON.stringify(args)}>
      <AuthForm {...args} />
    </div>
  ),
};
