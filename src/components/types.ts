import { ReactNode } from 'react';

// General component interfaces
export interface HeaderProps {
  children?: ReactNode;
  className?: string;
}
export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

// UI component interfaces
export enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface LogoProps {
  size?: Sizes;
  children?: React.ReactNode;
}

export interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

// Transaction component
export interface Transaction {
  amount: number;
  category: string;
  title: string;
  description: string;
}

export interface TransactionBrief extends Transaction {
  maxDescriptionLength?: number;
}

export interface TransactionFull extends TransactionBrief {
  date: string;
}

export interface Operation {
  id: string;
  amount: number;
  category: string;
  name: string;
  description: string;
  date: string; // ISO
}

export interface OperationItemProps {
  operation: Operation;
}

export interface OperationFullProps extends OperationItemProps {}

export interface OperationListProps {
  items?: Operation[];
  pageSize?: number;
  useInfinite?: boolean;
  unlimited?: boolean;
}

// Ecommerce component
export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AddToCartButtonProps {
  count: number;
  background?: string;
}

export interface ProductBriefProps {
  product: Product;
  maxDescriptionLength?: number;
}

export interface ProductFullProps {
  product: Product;
}

export interface CartItemProps {
  item: CartItem;
}

export interface ProductListProps {
  items?: Product[];
  pageSize?: number;
  useInfinite?: boolean;
  /** отключить верхний предел (по умолчанию лимит 200 эл-тов для демо) */
  unlimited?: boolean; 
}