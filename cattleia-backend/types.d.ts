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
    MONGODB_URI_TEST: string;
    DAPP_TOKEN: string;
    INFURA_MAIN: string;
    INFURA_ROPSTEN: string;
    INFURA_RINKEBY: string;
    GANACHE: string;
    STRIPE_SECRET: string;
    STRIPE_PUBLISHABLE: string;
    NODE_ENV: "production" | "development" | "test";
  }
}

declare type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
