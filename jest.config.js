module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@main/(.+)': '<rootDir>/src/main/$1',
    '@renderer/(.+)': '<rootDir>/src/renderer/$1',
    '@components/(.+)': '<rootDir>/src/renderer/components/$1',
    '@hooks/(.+)': '<rootDir>/src/renderer/hooks/$1',
    '@recoil/(.+)': '<rootDir>/src/renderer/recoil/$1',
    '@shared/(.+)': '<rootDir>/src/shared/$1',
  },
  globals: {
    window: '',
  },
};
