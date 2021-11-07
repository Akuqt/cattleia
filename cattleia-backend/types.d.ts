declare namespace Express {
  export interface Request {
    userName: string;
    id: string;
    role: string;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_ACCESS: string;
    JWT_REFRESH: string;
    MONGODB_URI: string;
    DAPP_TOKEN: string;
    INFURA_MAIN: string;
    INFURA_ROPSTEN: string;
    INFURA_RINKEBY: string;
    GANACHE: string;
    STRIPE_SECRET: string;
    STRIPE_PUBLISHABLE: string;
  }
}
