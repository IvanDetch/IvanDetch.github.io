import type { Preview } from "@storybook/react";
import React from 'react';
import { ThemeProvider } from '../src/shared/providers/ThemeProvider/ThemeProvider';
import LocalizationProvider from '../src/shared/providers/LocalizationProvider/LocalizationProvider';
import '../src/shared/providers/ThemeProvider/theme.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) =>
      React.createElement(
        LocalizationProvider,
        null,
        React.createElement(
          ThemeProvider,
          null,
          React.createElement('div', { style: { padding: 16 } }, React.createElement(Story))
        )
      ),
  ],
};

export default preview;
