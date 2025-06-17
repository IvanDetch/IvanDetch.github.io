/* eslint-disable prettier/prettier */
/*
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
*/

import { v4 as uuidv4 } from 'uuid';

/*
 * Тип Category
 */
export type Category = {
  id: string;
  name: string;
  photo?: string;
};

/*
 * Тип Product
 */
export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

/*
 * Тип Cost
 */
export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

/*
 * Profit
 */
export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

const randomId = () => uuidv4();
const randomPrice = () => Math.floor(Math.random() * 1000 + 100);
const randomName = () => ['Кофе', 'Чай', 'Булочка', 'Торт'][Math.floor(Math.random() * 4)];
const randomCategory = (): Category => ({
  id: randomId(),
  name: ['Продукты', 'Напитки', 'Выпечка'][Math.floor(Math.random() * 3)]
});

/*
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 */
export const createRandomProduct = (createdAt: string): Product => {
  return {
    id: randomId(),
    name: randomName(),
    photo: 'https://placehold.co/200x200',
    desc: 'Описание продукта',
    createdAt,
    oldPrice: randomPrice(),
    price: randomPrice(),
    category: randomCategory()
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 */
export const createRandomOperation = (createdAt: string): Operation => {
  const isCost = Math.random() > 0.5;
  return {
    id: randomId(),
    name: randomName(),
    desc: 'Описание операции',
    createdAt,
    amount: randomPrice(),
    category: randomCategory(),
    type: isCost ? 'Cost' : 'Profit',
  } as Operation;
};