import React, { useState, useRef, useEffect, memo } from 'react';
import Modal from '../Modal/Modal';
import styles from './ModalStateDemo.module.css';

const ModalStateDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Введите текст для модалки"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      />
      <button className={styles.button} onClick={() => setOpen(true)}>Открыть модальное окно</button>

      <Modal visible={open} onClose={() => setOpen(false)}>
        <h3>Ваш текст:</h3>
        <p>{text || '—'}</p>
      </Modal>
    </div>
  );
};

export default memo(ModalStateDemo);