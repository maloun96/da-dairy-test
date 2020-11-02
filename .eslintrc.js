module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "react-native/react-native": true
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/no-deprecated": 2,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-raw-text": 2,
    "react/prop-types": 0,
    "react/display-name": 0
  }
};
