import React, { MutableRefObject, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import s from './InfinityList.module.css';
import { useEvent } from '../../../shared/hooks/useEvent';

export type InfinityListRef = {
  scrollTo: (index: number) => void;
};
export type InfinityListVisibleItem<T> = {
  index: number;
  value: T;
};

/** Props */
export type InfinityListProps<T, P extends { data: T } = { data: T }> = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  /** optional fixed height for the root (string or number) */
  height?: number | string;
  items: T[];
  itemElement: React.ComponentType<P>;
  itemHeight: number;
  itemProps?: Omit<P, 'data'>;
  innerRef?: MutableRefObject<InfinityListRef | undefined>;
  startLoading?: React.ReactNode;
  endLoading?: React.ReactNode;
  style: React.CSSProperties;
  onEnd?: () => Promise<void>;
  onStart?: () => Promise<void>;
  reserve?: number;
  overscan?: number;
  getItemKey?: (value: T, index: number) => React.Key;
};

const DEFAULT_RESERVE = 100;
const DEFAULT_OVERSCAN = 2;

const stringify = (items: InfinityListVisibleItem<unknown>[]) => items.map((i) => i.index).join('_');
const equalItems = (a: InfinityListVisibleItem<unknown>[], b: InfinityListVisibleItem<unknown>[]) =>
  a.length === b.length && stringify(a) === stringify(b);

export const InfinityList = <T, P extends { data: T } = { data: T }>({
  className,
  height,
  items,
  itemElement: ItemElement,
  itemProps = {} as P,
  reserve = DEFAULT_RESERVE,
  overscan = DEFAULT_OVERSCAN,
  itemHeight,
  onEnd,
  onStart,
  innerRef,
  startLoading,
  endLoading,
  style,
  ...props
}: InfinityListProps<T, P>) => {
  const root = useRef<HTMLDivElement>(null!);
  const holder = useRef<HTMLDivElement>(null!);

  const [visibleItems, setVisibleItems] = useState<InfinityListVisibleItem<T>[]>([]);
  const prevScrollTop = useRef<number | null>(null);

  const calcVisible = useEvent(() => {
    const rootElem = root.current;
    const holderElem = holder.current;
    if (!rootElem || !holderElem) return;
    const rootRect = rootElem.getBoundingClientRect();
    const holderRect = holderElem.getBoundingClientRect();
    const startIndex = Math.max(Math.floor((rootRect.top - holderRect.top) / itemHeight) - overscan, 0);
    const visibleCount = Math.ceil(rootRect.height / itemHeight) + overscan * 2;
    const next: InfinityListVisibleItem<T>[] = [];
    for (let i = startIndex; i < Math.min(items.length, startIndex + visibleCount); i++) {
      next.push({ index: i, value: items[i] });
    }
    setVisibleItems((prev) => (equalItems(prev, next) ? prev : next));
  });

  const applied = useRef<{ end: boolean; start: boolean }>({ end: false, start: false });

  const handleInfinityScroll = () => {
    const rootRect = root.current.getBoundingClientRect();
    const holderRect = holder.current.getBoundingClientRect();
    const bottomDiff = holderRect.bottom - rootRect.bottom;
    const topDiff = rootRect.top - holderRect.top;
    if (prevScrollTop.current !== null) {
      if (prevScrollTop.current < root.current.scrollTop && bottomDiff <= reserve) {
        if (!applied.current.end && onEnd) {
          applied.current.end = true;
          onEnd().finally(() => {
            applied.current.end = false;
          });
        }
      } else if (prevScrollTop.current > root.current.scrollTop && topDiff <= reserve) {
        if (!applied.current.start && onStart) {
          const prevHeight = holder.current.getBoundingClientRect().height;
          applied.current.start = true;
          onStart().finally(() => {
            applied.current.start = false;
            root.current.scrollBy({ top: holder.current.getBoundingClientRect().height - prevHeight });
          });
        }
      }
    }
    prevScrollTop.current = root.current.scrollTop;
  };

  const commonCalc = useEvent(() => {
    calcVisible();
    handleInfinityScroll();
  });

  // recalc on items/height change
  useLayoutEffect(commonCalc, [items, itemHeight, overscan, commonCalc]);

  const startLoadingCount = startLoading ? 1 : 0;
  const endLoadingCount = endLoading ? 1 : 0;

  // ResizeObserver: recalc on container resize
  useLayoutEffect(() => {
    let raf = 0;
    const fn = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(commonCalc);
    };
    const ro = new ResizeObserver(fn);
    if (root.current) ro.observe(root.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [commonCalc]);

  useImperativeHandle(innerRef, () => ({
    scrollTo: (index: number) => root.current.scrollTo({ top: (index - 1 + startLoadingCount) * itemHeight }),
  }));

  const heightPx = typeof height === 'number' ? `${height}px` : height;
  const mergedStyle = height ? { ...style, height: heightPx } : style;

  const heightHolder = itemHeight * (items.length + endLoadingCount + startLoadingCount);

  const startElem = startLoading && (
    <div className={clsx(s.item, 'InfinityList__item')} style={{ height: itemHeight, top: 0 }} key="start">
      {startLoading}
    </div>
  );

  const endElem = endLoading && (
    <div
      className={clsx(s.item, 'InfinityList__item')}
      style={{ height: itemHeight, top: itemHeight * (startLoadingCount + items.length) }}
      key="end"
    >
      {endLoading}
    </div>
  );

  return (
    <div
      {...props}
      ref={root}
      className={clsx(s.root, 'InfinityList', className)}
      onScroll={commonCalc}
      style={mergedStyle}
    >
      <div ref={holder} style={{ height: heightHolder }} className={clsx(s.holder, 'InfinityList__holder')}>
        {startElem}
        {visibleItems.map((item) => {
          const styleItem = { height: itemHeight, top: itemHeight * (item.index + startLoadingCount) };
          const key = (props as any).getItemKey?.(item.value, item.index) ?? item.index;
          return (
            <div className={clsx(s.item, 'InfinityList__item')} style={styleItem} key={key}>
              <ItemElement {...(itemProps as P)} data={item.value} />
            </div>
          );
        })}
        {endElem}
      </div>
    </div>
  );
};
export default InfinityList;
