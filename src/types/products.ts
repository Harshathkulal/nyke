export type Product = {
  id: string;
  type: string;
  name: string;
  price: string;
  feature: string;
  gender: string;
  imageSrc?: string;   // optional, map to your DB image url field
  imageUrl?: string;
  imageAlt?: string;
};

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imageSrc?: string;
  image?: string;
}

export interface CartState {
  items: CartItemProps[];
  total: number;
  itemCount: number;
}
