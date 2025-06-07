export type Product = {
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

// interface Price {
//   value: {
//     type: string;
//     currencyCode: string;
//     centAmount: number;
//     fractionDigits: number;
//   };
//   discounted?: {
//     value: {
//       centAmount: number;
//       currencyCode: string;
//     };
//   };
// }

// interface Variant {
//   id: number;
//   sku: string;
//   prices?: Price[];
//   images?: Image[];
// }

// interface Description {
//   ['en-US']: string;
// }

// interface Staged {
//   description?: Description;
// }

// interface Current {
//   name: {
//     ['en-US']: string;
//   };
//   slug: {
//     ['en-US']: string;
//   };
//   masterVariant: Variant;
//   variants?: Variant[];
//   description: {
//     ['en-US']: string;
//   };
// }

// interface ProductResponse {
//   masterData: {
//     current: Current;
//     staged: Staged;
//   };
// }
