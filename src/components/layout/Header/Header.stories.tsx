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

const Template: Story = (args) => (
  <Header className={args.className}>
    <div dangerouslySetInnerHTML={{ __html: args.children }} />
  </Header>
);

export const Playground = Template.bind({});
Playground.args = {
  className: '',
  children: `<nav>
    <a href="#">Главная</a> | 
    <a href="#">О нас</a>
  </nav>`,
};