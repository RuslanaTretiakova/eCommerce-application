import type { JSX } from 'react';
import removeIcon from '../../../assets/img/cart/remove-form-cart.svg';
import type { IRemoveFromCartButtonProps } from '../../../types/interfaces';

import './remove-form-cart.scss';

function RemoveFromCartButton({
  onClick,
  title = 'Remove from Cart',
}: IRemoveFromCartButtonProps): JSX.Element {
  return (
    <button
      className="remove-from-cart-button"
      onClick={onClick}
      type="button"
      aria-label={title}
      title={title}
    >
      <img src={removeIcon} alt="Remove from cart" width={60} height={60} />
    </button>
  );
}

export default RemoveFromCartButton;
