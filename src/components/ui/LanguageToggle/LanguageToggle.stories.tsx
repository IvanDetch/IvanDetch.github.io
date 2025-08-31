import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LanguageToggle from './LanguageToggle';
import LocalizationProvider from '../../../shared/providers/LocalizationProvider/LocalizationProvider';
import '../../../shared/providers/ThemeProvider/theme.css';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Components/UI/LanguageToggle',
  component: LanguageToggle,
  decorators: [
    (Story) => (
      <LocalizationProvider>
        <Story />
      </LocalizationProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = { args: {} };
