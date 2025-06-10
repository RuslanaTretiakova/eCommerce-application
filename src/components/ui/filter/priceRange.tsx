import { useState } from 'react';
import './price-range-filter.scss';

type PriceRangeFilterProps = {
  onChange: (minPrice: number | null, maxPrice: number | null) => void;
};

function PriceRangeFilter({ onChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleApply = () => {
    const min = minPrice.trim() === '' ? null : parseFloat(minPrice);
    const max = maxPrice.trim() === '' ? null : parseFloat(maxPrice);

    if (min !== null && max !== null && min > max) {
      alert('Минимальная цена не может быть больше максимальной');
      return;
    }

    onChange(min, max);
  };

  return (
    <div className="price-range-filter">
      <h4>Filter by Price</h4>
      <div className="inputs">
        <input
          type="number"
          min="0"
          placeholder="Min Price (€)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <span>–</span>
        <input
          type="number"
          min="0"
          placeholder="Max Price (€)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
