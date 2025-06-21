export type Product = {
  sku: string;
  title: string;
  price: number;
  discountedPrice?: number | null;
  images: string[];
  description?: string;
};

export interface Image {
  url: string;
  label?: string;
  dimensions?: {
    w: number;
    h: number;
  };
}
