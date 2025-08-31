import { DiscountRepository } from './repository';
import { Percent, ProductType, UserType } from './types';

/**
 * AccountService calculates effective discounts for users.
 * Rules:
 *  - Each user type may have a global discount (applies to all products).
 *  - Additionally, for a concrete product type user type may have a specific discount.
 *  - When both exist, discounts are summed. Result is clamped to [0, 100].
 */
export class AccountService {
  constructor(private repo: DiscountRepository) {}

  /** Set global discount for user type */
  async setGlobal(userType: UserType, percent: Percent) {
    this.ensurePercent(percent);
    return this.repo.setGlobalDiscount(userType, percent);
  }

  /** Get global discount for user type (0 if not set) */
  async getGlobal(userType: UserType): Promise<Percent> {
    const p = await this.repo.getGlobalDiscount(userType);
    return this.normalize(p);
  }

  /** Set product-specific discount for user+product type */
  async setForProduct(userType: UserType, product: ProductType, percent: Percent) {
    this.ensurePercent(percent);
    return this.repo.setProductDiscount(userType, product, percent);
  }

  /** Get product-specific discount (0 if not set) */
  async getForProduct(userType: UserType, product: ProductType): Promise<Percent> {
    const p = await this.repo.getProductDiscount(userType, product);
    return this.normalize(p);
  }

  /** Calculate total effective discount for user on a given product */
  async getTotal(userType: UserType, product: ProductType): Promise<Percent> {
    const [g, s] = await Promise.all([
      this.repo.getGlobalDiscount(userType),
      this.repo.getProductDiscount(userType, product),
    ]);
    const total = this.normalize(g) + this.normalize(s);
    return Math.max(0, Math.min(100, total));
  }

  private ensurePercent(p: number) {
    if (!Number.isFinite(p) || p < 0 || p > 100) throw new Error('Percent must be in range 0..100');
  }
  private normalize(p: number | undefined | null): number { return Number.isFinite(p as any) ? (p as number) : 0; }
}
