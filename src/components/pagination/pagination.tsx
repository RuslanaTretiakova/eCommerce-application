import './pagination.scss';

interface PaginationProps<T> {
  arrayItems: T[];
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination<T>({ arrayItems, limit, currentPage, onPageChange }: PaginationProps<T>) {
  const pageCount = Math.ceil(arrayItems.length / limit);

  return (
    <div className="pagination">
      {Array.from({ length: pageCount }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            type="button"
            className={`button pagination-button ${currentPage === pageNumber ? 'pagination-button-active' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
