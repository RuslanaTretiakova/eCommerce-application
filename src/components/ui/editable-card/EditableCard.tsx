import edit from '../../../assets/img/edit-card/edit.svg';
import trash from '../../../assets/img/edit-card/trash.svg';
import type { IEditableCard } from '../../../types/interfaces';

import './editable-card.scss';

function EditableCard({ title, onEdit, onDelete, children }: IEditableCard) {
  return (
    <div className="editable-card">
      <div className="editable-card__header">
        <h3>{title}</h3>
        <div className="editable-card__buttons">
          {onEdit && (
            <button
              type="button"
              className="editable-card__edit-button"
              onClick={onEdit}
              aria-label={`Edit ${title}`}
            >
              <img src={edit} alt="edit icon" width={25} height={25} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="editable-card__delete-button"
              onClick={onDelete}
              aria-label={`Delete ${title}`}
            >
              <img src={trash} alt="delete icon" width={25} height={25} />
            </button>
          )}
        </div>
      </div>
      <div className="editable-card__content">{children}</div>
    </div>
  );
}

export default EditableCard;
