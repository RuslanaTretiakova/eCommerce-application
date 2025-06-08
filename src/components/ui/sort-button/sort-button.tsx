import './sort-button.scss';

type SortButtonProps = {
  attrSort: string;
  onClickF: () => void;
};

function SortButton({ attrSort, onClickF }: SortButtonProps) {
  return (
    <button className="sort-button button" type="button" onClick={() => onClickF()}>
      Sort by
      {attrSort}
    </button>
  );
}

export default SortButton;
