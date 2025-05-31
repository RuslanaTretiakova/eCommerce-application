export type Product = {
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

export interface ProductResponse {
  masterData: {
    current: Current;
    staged: Staged;
  };
}
