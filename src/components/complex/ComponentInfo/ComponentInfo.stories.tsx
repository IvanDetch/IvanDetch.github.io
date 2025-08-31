import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ComponentInfo } from '.';

const meta: Meta<typeof ComponentInfo> = {
  title: 'Components/Complex/ComponentInfo',
  component: ComponentInfo,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    title: { control: 'text' },
    desc: { control: 'text' },
  },
  args: {
    title: 'Компонент',
    desc: 'Описание компонента, ограничения и особенности.',
    fullWidth: false,
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ComponentInfo>;

export const Default: Story = {
  render: (args) => (
    <ComponentInfo {...args}>
      <div
        style={{
          width: 320,
          height: 120,
          border: '1px dashed #bbb',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        Тут будет пример использования
      </div>
    </ComponentInfo>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, title: 'Компонент на всю ширину' },
  render: (args) => (
    <ComponentInfo {...args}>
      <div
        style={{
          height: 120,
          border: '1px dashed #bbb',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        Демонстрация fullWidth
      </div>
    </ComponentInfo>
  ),
};
