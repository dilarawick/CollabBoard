module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/server/**/*.test.js'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/server.js',
    '!server/db/connect.js',
    '!server/config.js',
    '!server/seeds/**',
    '!server/mockdata/**'
  ],
  coverageDirectory: 'coverage/server',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  restoreMocks: true
};
