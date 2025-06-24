export type Product = {
  id: string;
  type: string;
  name: string;
  price: string;
  feature: string;
  gender: string;
  imageSrc?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  feature:string;
  size: string;
  imageSrc?: string;
  imageUrl?: string;
}

export interface CartState {
  items: CartItemProps[];
  total: number;
  itemCount: number;
}

