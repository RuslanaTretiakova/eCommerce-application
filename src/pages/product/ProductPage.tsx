import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDescription from '../../components/product/productDesc/productDescription';
import BaseButton from '../../components/ui/base-button/BaseButton';
import { ProductGallery } from '../../components/product/productSlider/productSlider';
import ProductHeader from '../../components/product/productHeader/productHeader';
// import ProductSpecification from '../../components/product/productSpec/productSpecification';
import './product.scss';

// const id = 'e507a429-1b68-455f-bf26-ea1d81da4bf3';

type Product = {
  title: string;
  price: number;
  images: string[];
  description: string;
};

interface Image {
  url: string;
  label?: string;
  dimensions?: {
    w: number;
    h: number;
  };
}

interface Price {
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface Variant {
  id: number;
  sku: string;
  prices?: Price[];
  images?: Image[];
}

interface Description {
  en: string;
}

interface Staged {
  description?: Description;
}

interface Current {
  name: {
    en: string;
  };
  slug: {
    en: string;
  };
  masterVariant: Variant;
  variants?: Variant[];
  description: {
    en: string;
  };
}

interface ProductResponse {
  masterData: {
    current: Current;
    staged: Staged;
  };
}

function Item() {
  debugger;
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/.netlify/functions/product?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');

        const data: ProductResponse = await response.json();
        const current = data.masterData.current;
        const staged = data.masterData.staged;
        const variant = current.masterVariant;
        const variants = current.variants || [];
        const description =
          staged.description?.en ??
          `Are you looking for a perfect bike? Here we are: ${current.name.en}`;

        const allImages: string[] = [
          ...(variant.images?.map((img) => img.url) || []),
          ...variants.flatMap((v) => v.images?.map((img) => img.url) || []),
        ];

        const price =
          variant.prices?.[0]?.value.centAmount ?? variants[0]?.prices?.[0]?.value.centAmount ?? 0;

        const productInfo: Product = {
          title: current.name.en,
          price: price / 100,
          images: allImages,
          description: description,
        };

        setProduct(productInfo);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !product) {
    debugger;
    console.log(error);
  }

  if (product) {
    return (
      <div className="product">
        <div className="product-slider">
          <ProductGallery images={product.images} />
        </div>
        <div className="product-info">
          <ProductHeader title={product.title} price={product.price} discount={0} />
          <ProductDescription description={product.description} />
          {/* <ItemSpecification specs={[{ frame: 'Al' }, { weight: '15.5kg' }]} /> */}
          <BaseButton type="button" className="button--submit" title="title">
            Add to cart
          </BaseButton>
        </div>
      </div>
    );
  }
}

export default Item;
