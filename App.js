import React from "react";
import { ThemeProvider } from "react-native-elements";
import { StatusBar, YellowBox } from "react-native";
import { Provider } from "react-redux";
import theme from "theme";
import Navigator from "./src/Navigator";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "reducers/store";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, { include: [/^pure/], exclude: [/^Connect/] });
}

YellowBox.ignoreWarnings(["Require cycle:"]);

export default function App() {
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme === "light" ? "light-content" : "dark-content";

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider useDark={colorScheme === "dark"} theme={theme}>
            <Navigator />
            <StatusBar barStyle={statusBarStyle} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
}
