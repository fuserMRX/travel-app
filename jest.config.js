const config = {
    verbose: true,
    moduleFileExtensions: ['js'],
    moduleDirectories: ['node_modules'],
    // enable jest to parse '@import' statements inside index.js
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    // ignore third-party library spin
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!spin.js)'
    ],
    // expose global variables for Jest
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;