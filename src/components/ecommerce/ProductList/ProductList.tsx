
import React, { useEffect, useMemo, useRef, useState, memo, useCallback } from 'react';
import styles from './ProductList.module.css';
import { Product, ProductListProps } from '../../types';
import { ProductBrief } from '../ProductBrief';
import { createRandomProduct } from '../../../lib/generators';

const DEFAULT_PAGE = 12;
const CAP = 200;

const ProductList: React.FC<ProductListProps> = ({ items = [], pageSize = DEFAULT_PAGE, useInfinite = true, unlimited = false }) => {
  const [data, setData] = useState<Product[]>(() => items.length ? items : Array.from({ length: pageSize }, () => createRandomProduct()));
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);

  const append = useCallback((count: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const next = Array.from({ length: count }, () => createRandomProduct());
    setData(prev => {
      const merged = [...prev, ...next];
      if (!unlimited && merged.length >= CAP) setHasMore(false);
      return merged;
    });
    setTimeout(() => { loadingRef.current = false; }, 0);
  }, [unlimited]);

  useEffect(() => {
    if (!useInfinite || !hasMore) return;
    const target = sentinelRef.current;
    if (!target) return;
    ioRef.current?.disconnect();
    ioRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first?.isIntersecting && hasMore) {
        append(pageSize);
      }
    }, { root: null, rootMargin: '200px', threshold: 0 });
    ioRef.current.observe(target);
    return () => ioRef.current?.disconnect();
  }, [useInfinite, pageSize, append, hasMore]);

  return (
    <div className={styles.wrap}>
      <ul className={styles.grid} aria-live="polite">
        {data.map((p, idx) => (
          <li key={p.name + '-' + idx} className={styles.item}>
            <ProductBrief product={p} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <>
          <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
          <div className={styles.footer}>
            <button type="button" className={styles.moreBtn} onClick={() => append(pageSize)}>
              Показать ещё
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ProductList);
