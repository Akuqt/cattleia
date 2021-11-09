export interface IAuth {
  user: User;
  ok: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description1: string;
  description2: string;
  onCart: boolean;
  img: string;
}

export interface Shop {
  products: Product[];
  cart: {
    count: number;
    products: Product[];
    total: number;
  };
}

export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  token: string;
  role: string;
  account: {
    hasAccount: boolean;
    balance: number;
    address: string;
  };
  rank: {
    points: number;
    name: string;
    color: string;
    next: {
      color: string;
      points: number;
      name: string;
    };
  };
}
