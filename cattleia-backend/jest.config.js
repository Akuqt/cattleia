require("dotenv").config();

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src/",
  verbose: true,
  silent: false,
  detectOpenHandles: false,
  reporters: ["default", "jest-junit"],
  coverageDirectory: "../coverage",
  collectCoverage: true,
};
