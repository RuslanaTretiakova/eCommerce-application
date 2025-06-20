export type CartItem = {
  id: string;
  name: {
    [locale: string]: string;
  };
  variant: {
    images: {
      url: string;
    }[];
    sku: string;
  };
  quantity: number;
  price: {
    value: {
      centAmount: number;
    };
    discounted?: {
      value: {
        centAmount: number;
      };
    };
  };
};

export type ParsedCartItem = {
  name: string;
  img: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number | undefined;
  variant: {
    sku: string;
  };
};

export type Cart = {
  id: string;
  version: number;
  lineItems: CartItem[];
  totalPrice: {
    centAmount: number;
    currencyCode: string;
  };
  discountOnTotalPrice?: {
    discountedAmount: {
      centAmount: number;
    };
  };
};
