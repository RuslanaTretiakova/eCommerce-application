import './modal.scss';

interface IModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

function Modal({ title, isOpen, onClose, onSave, children }: IModal) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="button button--save" type="button" onClick={onSave}>
            Save
          </button>
          <button className="button button--cart" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
