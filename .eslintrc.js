module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  globals: {
    Logger: true,
    performance: true,
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended", "@react-native-community"],
  ignorePatterns: ["scripts", "metro.config.js", "babel.config.js", ".eslintrc.js", "dbschema", "**/*.spec.ts"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    semi: "off",
    "no-extra-semi": "off",
    // curly: ['warn', 'multi-or-nest', 'consistent'],
    curly: "off", // eventually reintroduce
    "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
    "no-async-promise-executor": "warn",
    "require-await": "warn",
    "no-return-await": "warn",
    "no-await-in-loop": "warn",
    "@typescript-eslint/no-shadow": ["error"],
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "eslint-comments/no-unlimited-disable": "off",
    "comma-dangle": "off", // prettier already detects this
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        name: "firebase/firestore",
        message: "Use wrappers in src/models rather than importing Firestore into components.",
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "Enums have various disadvantages, use TypeScript's union types instead.",
      },
    ],
    "prettier/prettier": ["warn"],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-curly-brace-presence": [
      "warn",
      {
        props: "never",
        children: "ignore",
        propElementValues: "always",
      },
    ],
    "react/no-unescaped-entities": "off",
    "react/no-unstable-nested-components": "error",
    "react/react-in-jsx-scope": "off",
    "react-native/no-unused-styles": "warn",
    "react-native/split-platform-components": "off",
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": "off",
    "react-native/no-raw-text": "off",
    "react-native/no-single-element-style-arrays": "warn",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks:
          "(useStyle|useDerivedValue|useAnimatedStyle|useAnimatedProps|useWorkletCallback|useFrameProcessor|useRecoilCallback|useRecoilTransaction_UNSTABLE)",
      },
    ],
  },
  overrides: [
    {
      files: ["src/models/**/*.ts", "src/utils/common/db.ts", "plugins/withAndroidVerifiedLinksWorkaround.js"],
      rules: {
        "@typescript-eslint/no-restricted-imports": ["off"],
        "@typescript-eslint/no-var-requires": ["off"],
        "@typescript-eslint/no-unsafe-member-access": ["off"],
      },
    },
  ],
};
