import React from 'react';
import { makeProducts } from '../../lib/demoData';
let CartItemPattern: any;
try { CartItemPattern = require('../../components/ecommerce/CartItem').default; } catch {}

const CartPage: React.FC = () => {
  const products = React.useMemo(()=> makeProducts(5), []);
  const [qty, setQty] = React.useState<Record<string, number>>(()=> Object.fromEntries(products.map(p=>[p.id, 1])));
  return (
    <div style={{padding:16}}>
      <h2>Корзина</h2>
      <div style={{display:'grid', gap:12}}>
        {products.map((p:any) => (
          CartItemPattern ? (
            <CartItemPattern
              key={p.id}
              item={{ ...p, quantity: qty[p.id] ?? 1 }}
              quantity={qty[p.id] ?? 1}
              onQuantityChange={(v:number)=> setQty(prev=> ({...prev, [p.id]: v}))}
              onRemove={()=> setQty(prev=> ({...prev, [p.id]: 0}))}
            />
          ) : (
            <div key={p.id} style={{padding:12, border:'1px solid #eee', borderRadius:12}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <b>{p.name}</b>
                <span>{p.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
export default CartPage;
