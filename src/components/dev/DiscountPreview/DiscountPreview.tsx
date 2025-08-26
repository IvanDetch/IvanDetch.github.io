import React from 'react';
import { AccountService, InMemoryDiscountRepository, ProductType, UserType } from '../../../test/account';

function createDefaultService() {
  const repo = new InMemoryDiscountRepository();
  const svc = new AccountService(repo);
  // seed defaults for demo
  void svc.setGlobal(UserType.Standard, 5);
  void svc.setGlobal(UserType.Premium, 10);
  void svc.setGlobal(UserType.Gold, 15);
  void svc.setForProduct(UserType.Premium, ProductType.Car, 5);
  void svc.setForProduct(UserType.Gold, ProductType.Food, 7);
  return svc;
}

export type DiscountPreviewProps = {
  service?: AccountService;
  refreshTrigger?: number;
};

export const DiscountPreview: React.FC<DiscountPreviewProps> = ({ service, refreshTrigger }) => {
  const svc = React.useMemo(() => service ?? createDefaultService(), [service]);
  const [user, setUser] = React.useState<UserType>(UserType.Standard);
  const [product, setProduct] = React.useState<ProductType>(ProductType.Car);
  const [total, setTotal] = React.useState<number>(0);
  const [global, setGlobal] = React.useState<number>(0);
  const [specific, setSpecific] = React.useState<number>(0);

  const recalc = React.useCallback(async () => {
    setGlobal(await svc.getGlobal(user));
    setSpecific(await svc.getForProduct(user, product));
    setTotal(await svc.getTotal(user, product));
  }, [svc, user, product]);

  React.useEffect(() => { recalc(); }, [recalc, refreshTrigger]);

  return (
    <div style={{ display:'grid', gap: 12, maxWidth: 520 }}>
      <h3>AccountService preview</h3>
      <div style={{ display:'flex', gap: 8 }}>
        <label>Пользователь:</label>
        <select value={user} onChange={(e) => setUser(e.target.value as UserType)}>
          {Object.values(UserType).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <label>Товар:</label>
        <select value={product} onChange={(e) => setProduct(e.target.value as ProductType)}>
          {Object.values(ProductType).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div style={{ display:'grid', gap: 6, padding: 12, border:'1px solid #eee', borderRadius: 12 }}>
        <div>Глобальная скидка: <b>{global}%</b></div>
        <div>Скидка на товар: <b>{specific}%</b></div>
        <div>Итого: <b>{total}%</b></div>
      </div>
    </div>
  );
};

export default DiscountPreview;
