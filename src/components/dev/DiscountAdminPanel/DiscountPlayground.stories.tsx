import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AccountService, InMemoryDiscountRepository } from '../../../test/account';
import DiscountAdminPanel from './DiscountAdminPanel';
import DiscountPreview from '../DiscountPreview/DiscountPreview';

const meta: Meta = {
  title: 'Dev/Discount Playground (Admin+Preview)',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} as any;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);
    const [tick, setTick] = React.useState(0);
    // seed baseline
    void svc.setGlobal('Standard' as any, 5);
    void svc.setGlobal('Premium' as any, 10);
    void svc.setGlobal('Gold' as any, 15);

    return (
      <div style={{ display:'grid', gap: 16 }}>
        <DiscountAdminPanel service={svc} onApplied={()=>setTick(t => t+1)} />
        <DiscountPreview service={svc} refreshTrigger={tick} />
      </div>
    );
  }
};
