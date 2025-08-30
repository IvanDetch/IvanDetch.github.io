import React from 'react';
import Modal from './Modal';
import { ModalProps } from '../../types';
/**
 * URL-driven modal wrapper: opens the underlying Modal immediately on mount.
 * Works with Modal API that uses renderTrigger(open).
 */
type AutoOpenProps = Omit<ModalProps, 'visible' | 'renderTrigger'> & React.HTMLAttributes<HTMLDivElement>;

const AutoOpenModal: React.FC<AutoOpenProps> = (props) => {
  const openerRef = React.useRef<() => void>();

  React.useEffect(() => {
    openerRef.current?.();
  }, []);

  return (
    <Modal
      {...props}
      visible={true}
      renderTrigger={(open) => {
        openerRef.current = open;
        return null;
      }}
    />
  );
};

export default AutoOpenModal;
