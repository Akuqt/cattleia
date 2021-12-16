declare namespace Express {
  export interface Request {
    userName: string;
    id: string;
    role: string;
    privateKey: string;
    address: string;
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
    TEST_PRIVATE_KEY: string;
    TRUFFLE_KEY: string;
    ECR20_ADDRESS: string;
    ECR721_ADDRESS: string;
  }
}

declare type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
