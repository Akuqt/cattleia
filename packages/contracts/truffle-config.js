require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.TRUFFLE_KEY.trim();
const rinkebyEndpoint = process.env.INFURA_RINKEBY;

module.exports = {
  contracts_directory: "./code",
  contracts_build_directory: "./abis",
  migrations_directory: "./migrations",
  test_directory: "./test",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, rinkebyEndpoint);
      },
      network_id: 4,
      gas: 29970677,
      gasPrice: 10000000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
