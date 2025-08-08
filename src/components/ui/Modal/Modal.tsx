import React from 'react';
import s from './Modal.module.css';
import { ModalProps } from '../../types';

const Modal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
  if (!visible) return null;

  return (
    <div className={s.backdrop} role="dialog" aria-modal="true">
      <div className={s.container}>
        <button
          type="button"
          className={s.dismiss}
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;