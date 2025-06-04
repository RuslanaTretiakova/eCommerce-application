import type { ChangeEvent } from 'react';
import getSearchProductListFromServer from '../../api/getSearchProducts';
// import type { Product } from "../../types/productTypes";
import type { Product } from '@commercetools/platform-sdk';

export type SearchProductProps = {
  onSearchResults: (results: Product[]) => void;
};

function SearchProduct({ onSearchResults }: SearchProductProps) {
  async function handleSearchQuery(e: ChangeEvent<HTMLInputElement>) {
    const queryParam = e.target.value;
    console.log(queryParam);

    try {
      const data = await getSearchProductListFromServer(queryParam);
      console.log(data);
      onSearchResults(data.results || []);
      console.log(onSearchResults);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  return (
    <div className="search-product">
      <input className="search-field" placeholder="Search product" onChange={handleSearchQuery} />
    </div>
  );
}

export default SearchProduct;
