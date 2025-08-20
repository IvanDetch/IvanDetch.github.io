import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { OperationList } from '.';
import { createRandomOperation } from '../../../../lib/generators';

const meta: Meta<typeof OperationList> = {
  title: 'Components/Finance/Operations/OperationList',
  component: OperationList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: { type: 'number', min: 0, max: 1000, step: 5 } },
    pageSize: { control: { type: 'number', min: 1, max: 60, step: 1 } },
    useInfinite: { control: 'boolean' },
    unlimited: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof OperationList>;

export const Default: Story = {
  args: {
    items: 20,
    pageSize: 10,
    useInfinite: true,
    unlimited: false,
  } as any,
  render: (args) => {
    const items = Array.from({ length: (args as any).generatedCount }, () => createRandomOperation());
    return (
      <OperationList
        items={items}
        pageSize={(args as any).pageSize}
        useInfinite={(args as any).useInfinite}
        unlimited={(args as any).unlimited}
      />
    );
  },
};
