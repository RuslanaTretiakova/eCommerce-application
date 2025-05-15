import type { JSX } from 'react';
import type { IBaseButtonProps } from '../../../types/interfaces';

import './_base_button.scss'; // todo add all button states

function BaseButton({
  type,
  className = 'button',
  title,
  onClick,
  disabled = false,
  children,
}: IBaseButtonProps): JSX.Element {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'} //todo not sure about this syntax;
      className={`button ${className}`}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
