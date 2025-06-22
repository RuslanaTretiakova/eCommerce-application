import type { JSX } from 'react';
import type { IBaseButtonProps } from '../../../types/interfaces';

import './_base_button.scss';

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
      type={type === 'submit' ? 'submit' : 'button'}
      className={`button ${className}`}
      title={title}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
