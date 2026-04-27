module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@context': './src/context',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@src': './src',
        },
      },
    ],
  ],
};
