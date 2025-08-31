import React, { useLayoutEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InfinityList, InfinityListRef } from './InfinityList';
import { ComponentInfo } from '../ComponentInfo';

const DEFAULT_COUNT = 100;
const DEFAULT_TIMEOUT = 200;

type BoxProps = { data: number };
const Box: React.FC<BoxProps> = ({ data }) => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      height: '100%',
      border: '1px solid #ddd',
    }}
  >
    #{data}
  </div>
);

type DemoProps = {
  generatedCount?: number;
  height?: number;
  itemHeight?: number;
  reserve?: number;
  overscan?: number;
  timeout?: number;
};
const Demo: React.FC<DemoProps> = ({
  generatedCount = DEFAULT_COUNT,
  height = 360,
  itemHeight = 48,
  reserve = 100,
  overscan = 2,
  timeout = DEFAULT_TIMEOUT,
}) => {
  const [items, setItems] = useState<number[]>(() =>
    Array(generatedCount)
      .fill(0)
      .map((_, i) => i + 1)
  );
  const ref = useRef<InfinityListRef>();
  useLayoutEffect(() => {
    ref.current?.scrollTo(Math.min(50, items.length));
  }, [items.length]);

  return (
    <ComponentInfo
      title="InfinityList"
      desc="Виртуализированный бесконечный список. Добавление вверх/вниз, ResizeObserver, scrollTo."
      fullWidth
    >
      <InfinityList<number, { data: number }>
        innerRef={ref as any}
        items={items}
        itemElement={Box as any}
        itemHeight={itemHeight}
        reserve={reserve}
        overscan={overscan}
        height={height}
        startLoading={<div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>Загружаю вверх…</div>}
        endLoading={<div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>Загружаю вниз…</div>}
        onStart={() =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setItems((v) => {
                const min = v[0] ?? 0;
                return [
                  ...Array(generatedCount)
                    .fill(0)
                    .map((_, i) => min - i - 1)
                    .reverse(),
                  ...v,
                ];
              });
              resolve();
            }, timeout);
          })
        }
        onEnd={() =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setItems((v) => {
                const max = v[v.length - 1] ?? 0;
                return [
                  ...v,
                  ...Array(generatedCount)
                    .fill(0)
                    .map((_, i) => max + i + 1),
                ];
              });
              resolve();
            }, timeout);
          })
        }
        style={undefined}
      />
    </ComponentInfo>
  );
};

const meta: Meta<typeof Demo> = {
  title: 'Components/Complex/InfinityList',
  component: Demo,
  tags: ['autodocs'],
  args: { generatedCount: 100, height: 360, itemHeight: 48, reserve: 100, overscan: 2, timeout: 200 },
  argTypes: {
    generatedCount: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
    height: { control: { type: 'number', min: 200, max: 800, step: 20 } },
    itemHeight: { control: { type: 'number', min: 24, max: 160, step: 4 } },
    reserve: { control: { type: 'number', min: 0, max: 600, step: 10 } },
    overscan: { control: { type: 'number', min: 0, max: 10, step: 1 } },
    timeout: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Demo>;
export const Default: Story = {};
