import './confirmationPrompt.scss';

interface ConfirmationPromptProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationPrompt({ onConfirm, onCancel }: ConfirmationPromptProps) {
  return (
    <div className="cart-modal__overlay">
      <div className="cart-modal">
        <p>Are you sure you want to clear the entire shopping cart?</p>
        <div className="cart-modal__buttons">
          <button type="button" onClick={onConfirm} className="confirm-btn">
            Yes
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPrompt;
