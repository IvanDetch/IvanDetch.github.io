import { AccountService } from '../AccountService';
import { ProductType, UserType } from '../types';
import type { DiscountRepository } from '../repository';

function createRepoMock(): jest.Mocked<DiscountRepository> {
  return {
    getGlobalDiscount: jest.fn(),
    setGlobalDiscount: jest.fn(),
    getProductDiscount: jest.fn(),
    setProductDiscount: jest.fn(),
  };
}

describe('AccountService with mocked repository', () => {
  test('calls repository with correct arguments', async () => {
    const repo = createRepoMock();
    const svc = new AccountService(repo);

    await svc.setGlobal(UserType.Premium, 12);
    expect(repo.setGlobalDiscount).toHaveBeenCalledWith(UserType.Premium, 12);

    await svc.setForProduct(UserType.Gold, ProductType.Food, 7);
    expect(repo.setProductDiscount).toHaveBeenCalledWith(UserType.Gold, ProductType.Food, 7);

    repo.getGlobalDiscount.mockResolvedValueOnce(10);
    repo.getProductDiscount.mockResolvedValueOnce(5);
    await expect(svc.getTotal(UserType.Premium, ProductType.Car)).resolves.toBe(15);
    expect(repo.getGlobalDiscount).toHaveBeenCalledWith(UserType.Premium);
    expect(repo.getProductDiscount).toHaveBeenCalledWith(UserType.Premium, ProductType.Car);
  });

  test('does not call repo setters if percent is invalid', async () => {
    const repo = createRepoMock();
    const svc = new AccountService(repo);

    await expect(svc.setGlobal(UserType.Standard, -1)).rejects.toThrow();
    expect(repo.setGlobalDiscount).not.toHaveBeenCalled();

    await expect(svc.setForProduct(UserType.Standard, ProductType.Toy, 1000)).rejects.toThrow();
    expect(repo.setProductDiscount).not.toHaveBeenCalled();
  });

  test('getTotal clamps to [0..100] and treats undefined as 0', async () => {
    const repo = createRepoMock();
    const svc = new AccountService(repo);

    // undefined + undefined => 0
    repo.getGlobalDiscount.mockResolvedValueOnce(undefined as any);
    repo.getProductDiscount.mockResolvedValueOnce(undefined as any);
    await expect(svc.getTotal(UserType.Free, ProductType.Car)).resolves.toBe(0);

    // 60 + 50 => 100 (clamped)
    repo.getGlobalDiscount.mockResolvedValueOnce(60);
    repo.getProductDiscount.mockResolvedValueOnce(50);
    await expect(svc.getTotal(UserType.Gold, ProductType.Car)).resolves.toBe(100);

    // boundaries
    await expect(svc.setGlobal(UserType.Free, 0)).resolves.toBeUndefined();
    await expect(svc.setForProduct(UserType.Free, ProductType.Food, 100)).resolves.toBeUndefined();
  });

  test('independent discounts for different user/product pairs', async () => {
    const repo = createRepoMock();
    const svc = new AccountService(repo);

    // Premium Toy: g=10, s=3 => 13
    repo.getGlobalDiscount.mockResolvedValueOnce(10);
    repo.getProductDiscount.mockResolvedValueOnce(3);
    await expect(svc.getTotal(UserType.Premium, ProductType.Toy)).resolves.toBe(13);

    // Premium Car: g=10, s=5 => 15
    repo.getGlobalDiscount.mockResolvedValueOnce(10);
    repo.getProductDiscount.mockResolvedValueOnce(5);
    await expect(svc.getTotal(UserType.Premium, ProductType.Car)).resolves.toBe(15);

    // Standard Food: g=5, s=0 => 5
    repo.getGlobalDiscount.mockResolvedValueOnce(5);
    repo.getProductDiscount.mockResolvedValueOnce(0);
    await expect(svc.getTotal(UserType.Standard, ProductType.Food)).resolves.toBe(5);
  });
});
