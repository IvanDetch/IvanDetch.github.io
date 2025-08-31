import { AccountService } from '../AccountService';
import { InMemoryDiscountRepository } from '../repository';
import { ProductType, UserType } from '../types';

describe('AccountService discounts (TDD)', () => {
  test('sets and reads global discounts per user type', async () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);

    await svc.setGlobal(UserType.Standard, 5);
    await svc.setGlobal(UserType.Premium, 10);
    await svc.setGlobal(UserType.Gold, 15);
    await svc.setGlobal(UserType.Free, 0);

    expect(await svc.getGlobal(UserType.Standard)).toBe(5);
    expect(await svc.getGlobal(UserType.Premium)).toBe(10);
    expect(await svc.getGlobal(UserType.Gold)).toBe(15);
    expect(await svc.getGlobal(UserType.Free)).toBe(0);
  });

  test('sets and reads product-specific discounts per user+product', async () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);

    await svc.setForProduct(UserType.Premium, ProductType.Car, 12);
    await svc.setForProduct(UserType.Premium, ProductType.Toy, 3);
    await svc.setForProduct(UserType.Gold, ProductType.Food, 7);

    expect(await svc.getForProduct(UserType.Premium, ProductType.Car)).toBe(12);
    expect(await svc.getForProduct(UserType.Premium, ProductType.Toy)).toBe(3);
    expect(await svc.getForProduct(UserType.Premium, ProductType.Food)).toBe(0); // not set
    expect(await svc.getForProduct(UserType.Gold, ProductType.Food)).toBe(7);
  });

  test('sums global and product-specific discounts', async () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);

    await svc.setGlobal(UserType.Premium, 10);
    await svc.setForProduct(UserType.Premium, ProductType.Car, 5);

    expect(await svc.getTotal(UserType.Premium, ProductType.Car)).toBe(15);
    expect(await svc.getTotal(UserType.Premium, ProductType.Toy)).toBe(10);
  });

  test('clamps total discount to 100%', async () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);

    await svc.setGlobal(UserType.Gold, 70);
    await svc.setForProduct(UserType.Gold, ProductType.Car, 40);

    expect(await svc.getTotal(UserType.Gold, ProductType.Car)).toBe(100);
  });

  test('validates percent bounds [0..100] on setters', async () => {
    const repo = new InMemoryDiscountRepository();
    const svc = new AccountService(repo);

    await expect(svc.setGlobal(UserType.Standard, -1)).rejects.toThrow();
    await expect(svc.setGlobal(UserType.Standard, 101)).rejects.toThrow();
    await expect(svc.setForProduct(UserType.Standard, ProductType.Car, -5)).rejects.toThrow();
    await expect(svc.setForProduct(UserType.Standard, ProductType.Car, 1000)).rejects.toThrow();
  });
});
