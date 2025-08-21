import React, { Fragment } from 'react';
import type { ListProps } from '../../types';

function ListInner<T>({ items, children, as: As = 'div', renderEmpty, ...rest }: ListProps<T>) {
  if (!items || items.length === 0) {
    return <>{renderEmpty ? renderEmpty() : null}</>;
  }
  const content = items.map((it, i) => <Fragment key={i}>{children(it, i)}</Fragment>);
  return <As {...rest}>{content}</As>;
}

const List = ListInner as unknown as <T>(p: ListProps<T>) => JSX.Element;
export default List;
