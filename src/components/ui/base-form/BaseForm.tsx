import React, { type ReactNode, type JSX } from 'react';

interface IBaseForm {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  title: string;
  className: string;
}

function BaseForm({ onSubmit, children, title, className }: IBaseForm): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={className}>
      <h2 className={className}>{title}</h2>
      {children}
    </form>
  );
}

export default BaseForm;
