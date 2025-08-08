import React from 'react';
import Layout from './Layout';
import type { Meta, StoryObj } from '@storybook/react';

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

const defaultChildren = (
  <div>
    <h1>Добро пожаловать в интерфейс OTUS</h1>
    <p>Этот макет включает прилипший Header с логотипом и областью контента ниже.</p>
    <p>Вы можете использовать этот Layout для страниц дашбордов, профиля, каталога и др.</p>
  </div>
);

const longChildren = (
  <div>
    <h1>Прокрутка и фиксированный Header</h1>
    <p>Ниже находятся секции, каждая с уникальным содержимым.</p>
    {Array.from({ length: 5 }, (_, i) => (
      <section
        key={i}
        style={{
          margin: '20px 0',
          padding: '20px',
          background: i % 2 === 0 ? '#ffffff' : '#f9fafb',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h2>Секция {i + 1}</h2>
        <p>
          Это демонстрация длинного контента. Прокрутите вниз и убедитесь, что Header остаётся на месте.
        </p>
      </section>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    children: defaultChildren,
  },
};

export const LongContent: Story = {
  args: {
    children: longChildren,
  },
};