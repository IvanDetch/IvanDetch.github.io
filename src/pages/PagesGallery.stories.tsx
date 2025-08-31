import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PagesGallery from './PagesGallery';

const meta: Meta<typeof PagesGallery> = {
  title: 'App/Pages Gallery',
  component: PagesGallery,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof PagesGallery>;
export const Default: Story = { render: () => <PagesGallery /> };
