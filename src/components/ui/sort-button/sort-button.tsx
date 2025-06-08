type SortButtonProps = {
  attrSort: string;
  onClickF: () => void;
};

function SortButton({ attrSort, onClickF }: SortButtonProps) {
  return <button type='button' onClick={() => onClickF()}>
    Sort by{attrSort}
    </button>;
}

export default SortButton;
