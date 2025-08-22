import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CroppedText } from '.';
import { ComponentInfo } from '../ComponentInfo';

const meta: Meta<typeof CroppedText> = {
  title: 'Components/Complex/CroppedText',
  component: CroppedText,
  tags: ['autodocs'],
  args: {
    opened: false,
    rows: 3,
    ellipsis: '…',
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  argTypes: {
    opened: { control: 'boolean' },
    rows: { control: { type: 'number', min: 0, max: 12, step: 1 } },
    ellipsis: { control: 'text' },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof CroppedText>;

export const Default: Story = {
  render: (args) => (
    <ComponentInfo
      title="CroppedText"
      desc="Обрезает текст по числу строк с пересчётом через ResizeObserver."
      fullWidth
    >
      <div style={{ maxWidth: 520 }}>
        <CroppedText {...args} />
      </div>
    </ComponentInfo>
  ),
};

export const ResponsiveWidth: Story = {
  render: (args) => {
    const [w, setW] = useState(520);
    return (
      <ComponentInfo
        title="Responsive demo"
        desc="Тяни слайдер ширины — текст перерассчитывается через ResizeObserver."
        fullWidth
      >
        <div style={{ marginBottom: 12 }}>
          <input
            type="range"
            min={240}
            max={800}
            step={10}
            value={w}
            onChange={(e) => setW(parseInt(e.target.value, 10))}
          />
          <span style={{ marginLeft: 8 }}>width: {w}px</span>
        </div>
        <div style={{ width: w }}>
          <CroppedText {...args} />
        </div>
      </ComponentInfo>
    );
  },
};

export const Opened: Story = {
  args: { opened: true },
  render: (args) => (
    <ComponentInfo title="Opened" desc="Полный текст без обрезки." fullWidth>
      <div style={{ maxWidth: 520 }}>
        <CroppedText {...args} />
      </div>
    </ComponentInfo>
  ),
};
