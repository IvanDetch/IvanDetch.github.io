/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.css';
import { ModalProps } from '../../types';

const ensureRoot = (id: string) => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
};

type ModalExtProps = ModalProps & React.HTMLAttributes<HTMLDivElement> & {
  renderTrigger?: (open: () => void) => React.ReactNode;
};

const Modal: React.FC<ModalExtProps> = ({ visible: controlledVisible, children, onClose, renderTrigger, ...rest }) => {
  const [inner, setInner] = useState(false);
  const isControlled = typeof controlledVisible === 'boolean';
  const visible = isControlled ? controlledVisible! : inner;
  const container = useMemo(() => ensureRoot('modal-root'), []);

  const close = useCallback(() => { onClose?.(); if (!isControlled) setInner(false); }, [onClose, isControlled]);
  const open = useCallback(() => { if (!isControlled) setInner(true); }, [isControlled]);

  useEffect(() => {
    if (!visible) return;
    const doc = container?.ownerDocument ?? document;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    doc.addEventListener('keydown', onKey);
    const prev = doc.body.style.overflow;
    doc.body.style.overflow = 'hidden';
    return () => {
      doc.removeEventListener('keydown', onKey);
      doc.body.style.overflow = prev;
    };
  }, [visible, close, container]);

  if (renderTrigger && !isControlled) {
    return (
      <>
        {renderTrigger(open)}
        {visible ? ReactDOM.createPortal(
          <div className={s.backdrop} role="dialog" aria-modal="true" onClick={close}>
            <div className={s.container} onClick={(e) => e.stopPropagation()} {...rest}>
              <button type="button" className={s.dismiss} aria-label="Закрыть модальное окно" onClick={close}>&times;</button>
              <div className={s.content}>{children}</div>
            </div>
          </div>, container) : null}
      </>
    );
  }

  if (!visible) return null;
  const content = (
    <div className={s.backdrop} role="dialog" aria-modal="true" onClick={close}>
      <div className={s.container} onClick={(e) => e.stopPropagation()} {...rest}>
        <button type="button" className={s.dismiss} aria-label="Закрыть модальное окно" onClick={close}>
          &times;
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, container);
};
export default Modal;
