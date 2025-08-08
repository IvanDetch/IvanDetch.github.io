// Modal.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Управляет видимостью модального окна',
    },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  args: {
    visible: true,
    children: 'Пример содержимого модального окна'
  },
};

export const WithToggle: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button onClick={() => setOpen(true)}>Открыть модалку</button>
        <Modal {...args} visible={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    children: 'Это модальное окно можно закрыть нажатием на крестик'
  }
};