/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  rootDir: 'src',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
};

module.exports = config;
