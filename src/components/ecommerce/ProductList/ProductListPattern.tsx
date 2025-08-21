import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import styles from './ProductList.module.css';
import { Product, ProductListPatternProps } from '../../types';
import { ProductBrief } from '../ProductBrief';
import { List } from '../../patterns/List';
import { useIntersection } from '../../../shared/hooks/useIntersection';

const DEFAULT_PAGE = 12;

const ProductListPattern: React.FC<ProductListPatternProps> = ({
  items,
  pageSize = DEFAULT_PAGE,
  useInfinite = false,
  renderItem,
}) => {
  const [data, setData] = useState<Product[]>(() => items.slice(0, Math.min(items.length, pageSize)));
  const [hasMore, setHasMore] = useState(items.length > pageSize);
  const loadingRef = useRef(false);

  const append = useCallback(
    (count: number) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        const next = items.slice(0, Math.min(items.length, data.length + count));
        setData(next);
        setHasMore(next.length < items.length);
        setTimeout(() => { 
            loadingRef.current = false; 
        }, 0);
    }, 
    [items, data.length]
  );

  // обновлять при смене входных items/pageSize
  useEffect(() => {
    const first = items.slice(0, Math.min(items.length, pageSize));
    setData(first);
    setHasMore(items.length > pageSize);
  }, [items, pageSize]);

  const { ref: sentinelRef } = useIntersection<HTMLDivElement>({
    enabled: useInfinite && hasMore,
    rootMargin: '200px',
    threshold: 0,
    onIntersect: () => append(pageSize),
  });

  return (
    <div className={styles.wrap}>
      <List items={data} as="ul" className={styles.grid} aria-live="polite" renderEmpty={() => <div>Нет товаров</div>}>
        {(p, idx) => (
          <li key={p.name + '-' + idx} className={styles.item}>
            {renderItem ? renderItem(p, idx) : <ProductBrief product={p} />}
          </li>
        )}
      </List>

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

export default memo(ProductListPattern);
