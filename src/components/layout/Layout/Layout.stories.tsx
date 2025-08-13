import React from 'react';
import Layout from './Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Основной контент, отображаемый под шапкой',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

const DefaultChildren = () => {
  const { t } = useTranslation();
  return (
    <div style={{ background: 'var(--panel)', padding: 16, borderRadius: 12 }}>
      <h1>{t('layout.contentTitle')}</h1>
      <p>{t('layout.contentText')}</p>
    </div>
  );
};

const longChildren = (
  <div>
    <h1 style={{ color: 'black' }}>Прокрутка и фиксированный Header</h1>
    <p style={{ color: 'black' }}>Ниже находятся секции, каждая с уникальным содержимым.</p>
    {Array.from({ length: 5 }, (_, i) => (
      <section
        key={i}
        style={{
          margin: '20px 0',
          padding: '20px',
          background: 'var(--panel)',
          borderColor: 'var(--border)',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2 style={{ color: 'var(--text)' }}>Секция {i + 1}</h2>
        <p style={{ color: 'var(--text)' }}>
          Это демонстрация длинного контента. Прокрутите вниз и убедитесь, что Header остаётся на месте.
        </p>
      </section>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    children: <DefaultChildren />,
  },
};

export const LongContent: Story = {
  args: {
    children: longChildren,
  },
};