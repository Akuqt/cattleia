export interface IAuth {
  user: User;
}

export interface APIError {
  error: {
    message: string;
    code: number;
  };
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
    balance: {
      nft: {
        tokens: string[];
        total: number;
      };
      eth: number;
      ctt: number;
    };
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

export interface History {
  date: string;
  total: number;
  method: string;
}
