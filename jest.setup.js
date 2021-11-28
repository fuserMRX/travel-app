// expose library for Jest
// eslint-disable-next-line no-undef
global.Client = jest.genMockFromModule('./src/client/index.js');