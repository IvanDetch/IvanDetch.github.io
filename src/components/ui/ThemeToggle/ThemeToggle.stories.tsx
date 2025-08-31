import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../../../shared/providers/ThemeProvider/ThemeProvider';
import '../../../shared/providers/ThemeProvider/theme.css';
const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/UI/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ThemeToggle>;
export const Default: Story = { args: {} };
