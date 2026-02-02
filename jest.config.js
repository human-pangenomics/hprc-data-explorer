/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
};

module.exports = config;
