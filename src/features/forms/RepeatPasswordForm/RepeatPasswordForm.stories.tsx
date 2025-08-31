import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RepeatPasswordForm from './RepeatPasswordForm';

const meta: Meta<typeof RepeatPasswordForm> = {
  title: 'Features/Forms/RepeatPasswordForm (RHF+Yup)',
  component: RepeatPasswordForm,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof RepeatPasswordForm>;
export const Default: Story = { render: () => <RepeatPasswordForm /> };
