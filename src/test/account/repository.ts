import { UserType, ProductType, Percent } from './types';

export interface DiscountRepository {
  getGlobalDiscount(userType: UserType): Promise<Percent | undefined>;
  setGlobalDiscount(userType: UserType, percent: Percent): Promise<void>;

  getProductDiscount(userType: UserType, productType: ProductType): Promise<Percent | undefined>;
  setProductDiscount(userType: UserType, productType: ProductType, percent: Percent): Promise<void>;
}

/** Simple in-memory repository used for tests and Storybook/demo */
export class InMemoryDiscountRepository implements DiscountRepository {
  private global = new Map<UserType, Percent>();
  private perProduct = new Map<string, Percent>(); // key: `${userType}:${productType}`

  async getGlobalDiscount(userType: UserType): Promise<Percent | undefined> {
    return this.global.get(userType);
  }
  async setGlobalDiscount(userType: UserType, percent: Percent): Promise<void> {
    this.ensurePercent(percent);
    this.global.set(userType, percent);
  }

  async getProductDiscount(userType: UserType, productType: ProductType): Promise<Percent | undefined> {
    return this.perProduct.get(this.key(userType, productType));
  }
  async setProductDiscount(userType: UserType, productType: ProductType, percent: Percent): Promise<void> {
    this.ensurePercent(percent);
    this.perProduct.set(this.key(userType, productType), percent);
  }

  private key(userType: UserType, productType: ProductType) { return `${userType}:${productType}`; }

  private ensurePercent(p: number) {
    if (!Number.isFinite(p) || p < 0 || p > 100) throw new Error('Percent must be in range 0..100');
  }
}
