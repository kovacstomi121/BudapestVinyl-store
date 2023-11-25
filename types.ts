export interface Product {
  id: string;
  category: Category;
  name: string;
  artist: string;
  price: string;
  releaseYear: string;
  isFeatured: boolean;
  genre: Genre;
  images: Image[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  order: string;
  productId: string;
  product: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Genre {
  id: string;
  name: string;
  value: string;
}
