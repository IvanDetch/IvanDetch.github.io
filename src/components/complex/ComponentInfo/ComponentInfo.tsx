import React from 'react';
import clsx from 'clsx';
import s from './ComponentInfo.module.css';

export type ComponentInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

const ComponentInfo: React.FC<ComponentInfoProps> = ({ className, desc, fullWidth, title, children, ...props }) => {
  return (
    <div className={clsx(s.root, className)} {...props}>
      {title && <div className={s.title}>{title}</div>}
      {desc && <div>{desc}</div>}
      <div className={clsx(s.main, fullWidth && s.fullWidth)}>{children}</div>
    </div>
  );
};

export default ComponentInfo;
