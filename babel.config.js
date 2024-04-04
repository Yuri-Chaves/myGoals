module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@icons': './src/assets/icons',
          '@hooks': './src/hooks',
          '@helpers': './src/helpers',
          '@utils': './src/utils',
          '@routes': './src/routes',
          '@services': './src/services',
          '@domain': './src/domain',
          '@instances': './src/instances',
          '@databases': './src/databases',
          '@test': './src/test',
        },
      },
    ],
  ],
}
