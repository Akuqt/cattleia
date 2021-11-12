/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src/test/jest",
  verbose: true,
  silent: true,
  detectOpenHandles: false,
};
