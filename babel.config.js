module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      ['@babel/plugin-proposal-export-namespace-from'],
      [
        'module-resolver',
        {
          // extensions: ['.ts', '.tsx', '.js', '.jsx'],
          alias: {
            components: './src/components',
            context: './src/context',
            navigation: './src/navigation',
            screens: './src/screens',
            utils: './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
