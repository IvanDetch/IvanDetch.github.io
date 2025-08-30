import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './OperationList.module.css';
import { Operation as OperationItem } from '../Operation';
import { createRandomOperation } from '../../../../lib/generators';
import { Operation, OperationListProps } from '../../../types';

const DEFAULT_PAGE = 12;
const CAP = 300;

const OperationList: React.FC<OperationListProps> = ({
  items = [],
  pageSize = DEFAULT_PAGE,
  useInfinite = true,
  unlimited = false,
  renderActions,
}) => {
  const [data, setData] = useState<Operation[]>(() =>
    items.length ? items : Array.from({ length: pageSize }, () => createRandomOperation())
  );
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);

  const append = useCallback(
    (count: number) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      const next = Array.from({ length: count }, () => createRandomOperation());
      setData((prev) => {
        const merged = [...prev, ...next];
        if (!unlimited && merged.length >= CAP) setHasMore(false);
        return merged;
      });
      setTimeout(() => {
        loadingRef.current = false;
      }, 0);
    },
    [unlimited]
  );

  useEffect(() => {
    if (!useInfinite || !hasMore) return;
    const target = sentinelRef.current;
    if (!target) return;
    ioRef.current?.disconnect();
    ioRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasMore) append(pageSize);
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );
    ioRef.current.observe(target);
    return () => ioRef.current?.disconnect();
  }, [useInfinite, pageSize, append, hasMore]);

  return (
    <div className={s.wrap}>
      <ul className={s.list} aria-live="polite">
        {data.map((op, idx) => (
          <li key={op.id + '-' + idx} className={s.item}>
            {/* Оборачиваем, чтобы действия уехали вправо */}
            <div className={s.row}>
              <OperationItem operation={op} />
              {renderActions ? (
                <div className={s.actions}>{renderActions(op, idx)}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <>
          <div ref={sentinelRef} className={s.sentinel} aria-hidden />
          <div className={s.footer}>
            <button type="button" className={s.moreBtn} onClick={() => append(pageSize)}>
              Показать ещё
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OperationList;
