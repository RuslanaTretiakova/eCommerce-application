import edit from '../../../assets/img/edit-card/edit.svg';
import type { IEditableCard } from '../../../types/interfaces';

import './editable-card.scss';

function EditableCard({ title, onEdit, children }: IEditableCard) {
  return (
    <div className="editable-card">
      <div className="editable-card__header">
        <h3>{title}</h3>
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
      </div>
      <div className="editable-card__content">{children}</div>
    </div>
  );
}

export default EditableCard;
