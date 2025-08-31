import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ModalStateDemo from './ModalStateDemo';
import { ThemeProvider } from '../../../shared/providers/ThemeProvider/ThemeProvider';
import '../../../shared/providers/ThemeProvider/theme.css';

const meta: Meta<typeof ModalStateDemo> = {
  title: 'Components/UI/ModalStateDemo',
  component: ModalStateDemo,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ModalStateDemo>;

export const Default: Story = { args: {} };