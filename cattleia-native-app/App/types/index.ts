export interface IAuth {
  user: User;
  ok: boolean;
}

export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  token: string;
  role: string;
  hasAccount: boolean;
  balance: string;
  address: string;
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
