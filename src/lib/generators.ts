/* Utility generators for demo data */
import { Product, Operation } from '../components/types';

const adjectives = ["Ультра","Супер","Эко","Премиум","Мини","Мега","Pro","Lite"];
const nouns = ["Кофеварка","Наушники","Клавиатура","Монитор","Пылесос","Мышь","Лампа","Термокружка"];
const opCats = ["Покупка","Подписка","Комиссия","Возврат","Перевод"] as const;
const prodCats = ["electronics","home","office","lifestyle"] as const;

let idSeq = 1000;
export function createRandomProduct(): Product {
  const name = `${pick(adjectives)} ${pick(nouns)}`;
  const price = round(rand(499, 49999), 2);
  const category = pick(prodCats) as unknown as string;
  const description = `Описание: ${name}. Категория: ${category}. Это сгенерированный демо‑товар для списка.`;

  return {
    name,
    price,
    image: `https://picsum.photos/seed/${idSeq++}/320/240`,
    description,
    category,
  };
}

export function createRandomOperation(): Operation {
  const name = pick(["Оплата", "Покупка", "Списание", "Поступление", "Перевод"]);
  const amount = Math.round(rand(-5000, 20000));
  const category = pick(opCats) as unknown as string;
  const description = `Операция: ${name}. Категория: ${category}. Демо.`;
  const dt = new Date(Date.now() - Math.floor(rand(0, 100)) * 86400000);
  return {
    id: (idSeq++).toString(),
    name,
    amount,
    category,
    description,
    date: dt.toISOString(),
  };
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function round(n: number, d: number) {
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}
