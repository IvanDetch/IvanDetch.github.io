import React from 'react';
import cn from 'clsx';
import s from './FormField.module.css';

export type CommonFieldProps = {
  label?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  inputClassName?: string;
};

export const TextField = React.forwardRef<
  HTMLInputElement,
  CommonFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, error, className, inputClassName, ...rest }, ref) => (
  <div className={cn(s.row, className)}>
    {label && (
      <label className={s.label} htmlFor={rest.id || rest.name}>
        {label}
      </label>
    )}
    <input ref={ref} {...rest} className={cn(s.input, inputClassName)} />
    {error && <div className={s.error}>{error}</div>}
  </div>
));
TextField.displayName = 'TextField';

export const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  CommonFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, error, className, inputClassName, ...rest }, ref) => (
  <div className={cn(s.row, className)}>
    {label && (
      <label className={s.label} htmlFor={rest.id || rest.name}>
        {label}
      </label>
    )}
    <textarea ref={ref} {...rest} className={cn(s.textarea, inputClassName)} />
    {error && <div className={s.error}>{error}</div>}
  </div>
));
TextAreaField.displayName = 'TextAreaField';

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  CommonFieldProps & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ label, error, className, inputClassName, children, ...rest }, ref) => (
  <div className={cn(s.row, className)}>
    {label && (
      <label className={s.label} htmlFor={rest.id || rest.name}>
        {label}
      </label>
    )}
    <select ref={ref} {...rest} className={cn(s.select, inputClassName)}>
      {children}
    </select>
    {error && <div className={s.error}>{error}</div>}
  </div>
));
SelectField.displayName = 'SelectField';
