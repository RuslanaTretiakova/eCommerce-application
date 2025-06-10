import { render, screen } from '@testing-library/react';
import type { IProductCard } from '../../../types/interfaces';
import { describe, it, expect } from 'vitest';
import ProductCard from '../../../components/ui/product-card/ProductCard';

const createMockProduct = (): IProductCard => ({
  name: 'Test Bike',
  description: 'Test description',
  price: '1234.56',
  imageUrl: 'https://test-image',
});

describe('ProductCard', () => {
  it('renders product data correctly', () => {
    const mock = createMockProduct();

    render(
      <ProductCard
        name={mock.name}
        description={mock.description}
        price={mock.price}
        imageUrl={mock.imageUrl}
      />,
    );

    expect(screen.getByText(/Test Bike/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByText(/1234.56/i)).toBeInTheDocument();

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toHaveAttribute('src', mock.imageUrl);
    expect(image).toHaveAttribute('alt', mock.name);
  });
});
