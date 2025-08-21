import React from 'react';
import type { WithLoadingProps } from '../../types';

export function withLoading<P extends object>(Comp: React.ComponentType<P>) {
  return function WithLoadingComp(props: P & WithLoadingProps) {
    const { loading, fallback = 'Loading…', ...rest } = props as any;
    if (loading) return <>{fallback}</>;
    return <Comp {...(rest as P)} />;
  };
}
