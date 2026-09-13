module.exports = {
  rootDir: '../..',

  testEnvironment: require.resolve(
    '../../client/node_modules/jest-environment-jsdom'
  ),

  testMatch: [
    '<rootDir>/tests/client/**/*.test.jsx',
    '<rootDir>/tests/client/**/*.test.js',
  ],

  transform: {
    '^.+\\.[jt]sx?$': [
      require.resolve('../../client/node_modules/babel-jest'),
      {
        presets: [
          require.resolve('../../client/node_modules/@babel/preset-env'),
          [
            require.resolve('../../client/node_modules/@babel/preset-react'),
            { runtime: 'automatic' },
          ],
        ],
      },
    ],
  },

  moduleDirectories: [
    '<rootDir>/client/node_modules',
    'node_modules',
  ],

  setupFilesAfterEnv: [
    '<rootDir>/tests/client/setupTests.js',
  ],

  collectCoverageFrom: [
    '<rootDir>/client/src/pages/BoardPage/BoardPage.jsx',
    '<rootDir>/client/src/components/board/Board/Board.jsx',
    '<rootDir>/client/src/components/board/Column/Column.jsx',
    '<rootDir>/client/src/components/board/TaskCard/TaskCard.jsx',
    '<rootDir>/client/src/components/board/BoardCounter/BoardCounter.jsx',
  ],

  coverageDirectory: '<rootDir>/coverage/client',

  clearMocks: true,
}