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
  onClose: () => void;
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