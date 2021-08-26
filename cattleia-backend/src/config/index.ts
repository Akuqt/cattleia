export default {
  PORT: process.env.PORT || 4000,
  JWT: {
    ACCESS: process.env.JWT_ACCESSS || "acc",
    REFRESH: process.env.JWT_REFRESH || "ref",
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/web3",
  },
  CORS: {
    ORIGIN: ["*"],
  },
};
