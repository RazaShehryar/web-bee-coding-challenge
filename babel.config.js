module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-proposal-export-namespace-from"],
      [
        "module-resolver",
        {
          // extensions: ['.ts', '.tsx', '.js', '.jsx'],
          alias: {
            assets: "./assets",
            components: "./src/components",
            context: "./src/context",
            helpers: "./src/helpers",
            hooks: "./src/hooks",
            navigation: "./src/navigation",
            screens: "./src/screens",
            static: "./src/static",
            styles: "./src/styles",
            utils: "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
