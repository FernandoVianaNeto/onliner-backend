module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$$': ['ts-jest', { isolatedModules: true }],
  },
  coverageReporters: [
    'html',
    'text-summary',
    'json-summary',
    'text',
    'lcov',
    'clover',
    'cobertura',
  ],
  coveragePathIgnorePatterns: [
    '.module.ts',
    '.dto.ts',
    '.interface.ts',
    '.mock.ts',
    'main.ts',
    'cli.ts',
    'schema.ts',
    '.enum.ts',
  ],
};
