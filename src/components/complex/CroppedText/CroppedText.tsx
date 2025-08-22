import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import s from './CroppedText.module.css';
import { useEvent } from '../../../shared/hooks/useEvent';

export type CroppedTextProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  /** исходный текст */
  children: string;
  /** показывать полный текст */
  opened?: boolean;
  /** количество строк в свернутом состоянии */
  rows?: number;
  /** строка-эллипсис */
  ellipsis?: string;
  style: React.CSSProperties;
};

const DEFAULT_ROWS = 3;
const DEFAULT_ELLIPSIS = '…';

/** измерение line-height */
function getLineHeightPx(el: HTMLElement): number {
  const cs = window.getComputedStyle(el);
  const lh = cs.lineHeight;
  if (lh === 'normal') {
    const fs = parseFloat(cs.fontSize || '16');
    return fs * 1.2;
  }
  return parseFloat(lh || '0') || 0;
}

/** создаёт скрытый измерительный контейнер шириной как у target */
function createMeasure(root: HTMLElement): HTMLDivElement {
  const div = document.createElement('div');
  const cs = window.getComputedStyle(root);
  div.style.position = 'absolute';
  div.style.left = '-99999px';
  div.style.top = '-99999px';
  div.style.whiteSpace = 'normal';
  div.style.wordWrap = 'break-word';
  div.style.width = root.clientWidth + 'px';
  // Наследуем базовые текстовые стили
  div.style.fontFamily = cs.fontFamily as string;
  div.style.fontSize = cs.fontSize as string;
  div.style.fontWeight = cs.fontWeight as string;
  div.style.letterSpacing = cs.letterSpacing as string;
  div.style.lineHeight = cs.lineHeight as string;
  div.style.padding = cs.padding as string;
  div.style.border = cs.border as string;
  div.style.boxSizing = cs.boxSizing as string;
  document.body.appendChild(div);
  return div;
}

const CroppedText: React.FC<CroppedTextProps> = ({
  className,
  children,
  opened = false,
  rows = DEFAULT_ROWS,
  ellipsis = DEFAULT_ELLIPSIS,
  style,
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState<string>(children);

  const recalc = useEvent(() => {
    const root = rootRef.current;
    if (!root) return;
    if (opened) {
      setText(children);
      return;
    }
    // Пустые случаи
    if (!children || rows <= 0) {
      setText(children);
      return;
    }
    // Измеряем доступную высоту
    const lineHeight = getLineHeightPx(root) || 20;
    const maxH = rows * lineHeight;

    // Создаём измеритель
    const probe = createMeasure(root);
    let lo = 0,
      hi = children.length,
      best = 0;

    const fits = (substr: string) => {
      probe.textContent = substr;
      const h = probe.getBoundingClientRect().height;
      return h <= maxH + 0.5;
    };

    // Быстрые граничные проверки
    if (fits(children)) {
      setText(children);
      document.body.removeChild(probe);
      return;
    }
    // Бинарный поиск по длине подстроки
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const candidate = children.slice(0, Math.max(0, mid)) + ellipsis;
      if (fits(candidate)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    const finalText = children.slice(0, Math.max(0, best)) + (best < children.length ? ellipsis : '');
    setText(finalText);
    document.body.removeChild(probe);
  });

  // Пересчёт: при изменениях текста/строк/режима
  useLayoutEffect(() => {
    setText(children);
    recalc();
  }, [children, rows, opened, recalc]);

  // ResizeObserver: при изменении ширины контейнера
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recalc);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [recalc]);

  return (
    <div ref={rootRef} className={clsx(s.root, className)} style={style} {...rest}>
      {opened ? children : text}
    </div>
  );
};

export default CroppedText;
