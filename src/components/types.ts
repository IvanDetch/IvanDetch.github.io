import React, { ReactNode } from 'react';

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

export interface ThemeToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (val: boolean) => void;
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

export interface AddToCartButtonExtendedProps extends AddToCartButtonProps {
  defaultCount?: number;
  onChange?: (next: number) => void;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
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

export interface CartItemEnhancedProps extends CartItemProps {
  /** управляемое количество (controlled) */
  quantity?: number;
  /** начальное количество в uncontrolled-режиме */
  defaultQuantity?: number;
  /** уведомляет об изменении количества */
  onQuantityChange?: (next: number) => void;
  /** колбэк удаления позиции */
  onRemove?: () => void;
  /** отключить кнопку удаления */
  disableRemove?: boolean;
  /** заменить блок действий своим рендером */
  renderActions?: (controls: {
    value: number;
    inc: () => void;
    dec: () => void;
    remove: () => void;
  }) => React.ReactNode;
}

export interface ProductListProps {
  items?: Product[];
  pageSize?: number;
  useInfinite?: boolean;
  /** отключить верхний предел (по умолчанию лимит 200 эл-тов для демо) */
  unlimited?: boolean;
}

export interface ProductListPatternProps {
  items?: Product[];
  pageSize?: number;
  useInfinite?: boolean;
  renderItem?: (p: Product, idx: number) => React.ReactNode;
}

// Patterns component
// HOC
export interface WithLoadingProps {
  loading?: boolean;
  fallback?: React.ReactNode;
}

// List
/**
 * Generic List component with "Function as children" pattern.
 * - items: T[]
 * - children: (item: T, index: number) => React.ReactNode
 * - renderEmpty?: () => React.ReactNode
 * - as?: keyof JSX.IntrinsicElements | React.ComponentType<any> (wrapper element)
 */
export interface ListProps<T> extends React.HTMLAttributes<HTMLElement> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
  as?: any;
  renderEmpty?: () => React.ReactNode;
}
