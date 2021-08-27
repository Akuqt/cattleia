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
}
