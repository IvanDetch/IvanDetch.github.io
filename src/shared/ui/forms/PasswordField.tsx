import React, { useState } from 'react';
import cn from 'clsx';
import s from './FormField.module.css';

export type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
  className: string;
};

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className, ...rest }, ref) => {
    const [show, setShow] = useState(false);
    return (
      <div className={cn(s.row, className)}>
        {label && (
          <label className={s.label} htmlFor={rest.id || rest.name}>
            {label}
          </label>
        )}
        <div className={s.inline} style={{ width: '100%' }}>
          <input ref={ref} {...rest} type={show ? 'text' : 'password'} className={s.input} />
          <button type="button" className={s.toggle} onClick={() => setShow((v) => !v)}>
            {show ? 'Скрыть' : 'Показать'}
          </button>
        </div>
        {error && <div className={s.error}>{error}</div>}
      </div>
    );
  }
);
PasswordField.displayName = 'PasswordField';
