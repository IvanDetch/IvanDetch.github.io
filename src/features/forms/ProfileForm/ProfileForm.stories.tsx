import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Forms/ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
  args: { initial: { name: 'Иван', email: 'ivan@example.com', phone: '+7 900 123-45-67', about: 'О себе…' } },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ProfileForm>;
export const Default: Story = {
  render: (args) => (
    <div key={JSON.stringify(args)}>
      <ProfileForm {...args} />
    </div>
  ),
};
