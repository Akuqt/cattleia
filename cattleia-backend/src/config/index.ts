export default {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    ACCESS: process.env.JWT_ACCESSS || "acc",
    REFRESH: process.env.JWT_REFRESH || "ref",
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/web3",
    TEST_URI: process.env.MONGODB_URI_TEST || "mongodb://localhost/web33",
  },
  CORS: {
    ORIGIN: ["*"],
  },
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
};
