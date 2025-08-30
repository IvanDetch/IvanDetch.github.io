export type Product = { id: string; name: string; description: string; price: number; image: string; category?: string };
export type Operation = { id: string; title: string; amount: number; type: 'income'|'expense'; date: string; note?: string };

export function makeProducts(n: number): Product[] {
  return Array.from({length:n}, (_,i)=>{
    const id = String(i+1);
    return {
      id,
      name: `Demo ${i+1}`,
      description: `Описание товара ${i+1}`,
      price: 1000 + (i+1)*10,
      image: `https://picsum.photos/seed/p${i+1}/320/240`,
      category: i%2 ? 'electronics' : 'home',
    };
  });
}

export function makeOperations(n: number): Operation[] {
  return Array.from({length:n}, (_,i)=> ({
    id: `op-${i + 1}`,
    title: `Операция ${i+1}`,
    amount: (i%2?1:-1) * (100 + i*7),
    type: i%2? 'income':'expense',
    date: new Date(Date.now()-i*864e5).toISOString().slice(0,10),
    note: i%3? '': 'Комментарий',
  }));
}
