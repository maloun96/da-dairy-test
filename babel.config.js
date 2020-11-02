module.exports = function (api) {
  api.cache(true);

  const presets = ["babel-preset-expo"];
  const plugins = [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "theme": "./src/theme",
        "components": "./src/components",
        "utils": "./src/utils",
        "screens": "./src/screens",
        "reducers": "./src/reducers",
        "actions": "./src/actions",
        "shared": "./src/shared",
        "selectors": "./src/selectors",
        "constants": "./src/constants"
      }
    }]
  ];

  return {
    presets,
    plugins
  };
};
