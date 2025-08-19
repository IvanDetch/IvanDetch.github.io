import React, { useEffect, useMemo } from 'react';
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

const Modal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
  const container = useMemo(() => ensureRoot('modal-root'), []);

  useEffect(() => {
    if (!visible) return;

    const doc = container?.ownerDocument ?? document;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    doc.addEventListener('keydown', onKey);

    const prev = doc.body.style.overflow;
    doc.body.style.overflow = 'hidden';

    return () => {
      doc.removeEventListener('keydown', onKey);
      doc.body.style.overflow = prev;
    };
  }, [visible, onClose, container]);

  if (!visible) return null;

  const content = (
    <div className={s.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={s.dismiss}
          aria-label="Закрыть модальное окно"
          onClick={onClose}
        >
          &times;
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, container);
};
export default Modal;