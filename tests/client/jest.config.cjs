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

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/client/styleMock.js',
  },

  moduleDirectories: [
    '<rootDir>/client/node_modules',
    'node_modules',
  ],

  setupFilesAfterEnv: [
    '<rootDir>/tests/client/setupTests.js',
  ],

  collectCoverageFrom: [
    '<rootDir>/client/src/pages/LoginPage/LoginPage.jsx',
    '<rootDir>/client/src/pages/SignupPage/SignupPage.jsx',
    '<rootDir>/client/src/components/ui/UserProfile/UserProfile.jsx',
    '<rootDir>/client/src/components/layout/AppLayout/AppLayout.jsx',
    '<rootDir>/client/src/components/ui/ThemeToggle/ThemeToggle.jsx',
    '<rootDir>/client/src/components/ui/Button/Button.jsx',
  ],

  coverageDirectory: '<rootDir>/coverage/client',

  clearMocks: true,
}
