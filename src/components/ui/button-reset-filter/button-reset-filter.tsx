import './button-reset-filter.scss';

function ButtonResetFilter({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="reset-button button" onClick={onClick}>
      RESET
    </button>
  );
}

export default ButtonResetFilter;
