import React, { type ReactNode, type JSX } from 'react';
import './_base-form.scss';

interface IBaseForm {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  title: string;
  className: string;
}

function BaseForm({ onSubmit, children, title, className = 'form' }: IBaseForm): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={className}>
      <h2 className={`${className}__title`}>{title}</h2>
      {children}
    </form>
  );
}

export default BaseForm;
