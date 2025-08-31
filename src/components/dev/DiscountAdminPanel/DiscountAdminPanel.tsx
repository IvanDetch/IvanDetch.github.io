
import React from 'react';
import { AccountService, ProductType, UserType } from '../../../test/account';

export type DiscountAdminPanelProps = {
  service: AccountService;
  onApplied?: () => void;
};

export const DiscountAdminPanel: React.FC<DiscountAdminPanelProps> = ({ service, onApplied }) => {
  const [user, setUser] = React.useState<UserType>(UserType.Standard);
  const [product, setProduct] = React.useState<ProductType>(ProductType.Car);
  const [g, setG] = React.useState<string>('0');
  const [s, setS] = React.useState<string>('0');
  const [err, setErr] = React.useState<string>('');

  const apply = async () => {
    setErr('');
    try {
      await service.setGlobal(user, Number(g));
      await service.setForProduct(user, product, Number(s));
      onApplied?.();
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    }
  };

  return (
    <div style={{ display:'grid', gap:12, maxWidth: 520 }}>
      <h3>Discount admin</h3>
      <div style={{ display:'grid', gap:8 }}>
        <label>Тип пользователя</label>
        <select value={user} onChange={(e)=>setUser(e.target.value as UserType)}>
          {Object.values(UserType).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      <div style={{ display:'grid', gap:8 }}>
        <label>Глобальная скидка, %</label>
        <input type="number" min={0} max={100} value={g} onChange={(e)=>setG(e.target.value)} />
      </div>
      <div style={{ display:'grid', gap:8 }}>
        <label>Тип товара</label>
        <select value={product} onChange={(e)=>setProduct(e.target.value as ProductType)}>
          {Object.values(ProductType).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={{ display:'grid', gap:8 }}>
        <label>Скидка на товар, %</label>
        <input type="number" min={0} max={100} value={s} onChange={(e)=>setS(e.target.value)} />
      </div>

      {err && <div style={{ color:'#b00020' }}>{err}</div>}

      <div style={{ display:'flex', gap: 8 }}>
        <button className="btn btn-primary" onClick={apply}>Сохранить</button>
        <button className="btn btn-ghost" onClick={()=>{ setG('0'); setS('0'); }}>Сброс</button>
      </div>
    </div>
  );
};

export default DiscountAdminPanel;
