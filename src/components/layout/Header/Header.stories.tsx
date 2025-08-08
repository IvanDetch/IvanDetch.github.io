import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Заголовок с логотипом и кастомным контентом внутри. Поддерживает HTML для навигации.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      name: 'Children HTML',
      description: 'Дополнительный контент в правой части хедера',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const Playground: Story = {
  args: {
    className: '',
    children: `<nav>
      <a href="#">Главная</a> |
      <a href="#">О нас</a>
    </nav>`,
  },
  render: (args) => {
    const { className, children } = args;
    // Convert children to HTML if it's a string
    const html = typeof children === 'string' ? children : '';
    return (
      <Header className={className}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Header>
    );
  },
};