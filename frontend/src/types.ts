export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  specs: Record<string, string>;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  features: string[];
  colors: string[];
  tags: string[];
  inStock: boolean;
  stockPercentage: number;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
}
