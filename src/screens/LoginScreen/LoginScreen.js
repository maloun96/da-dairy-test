import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import ImageHero from "screens/LoginScreen/components/ImageHero";
import LoginContainer from "screens/LoginScreen/components/LoginContainer";
import KeyboardShift from "shared/KeyboardShift";

const LoginScreen = () => (
  <>
    <StatusBar hidden={true} />
    <KeyboardShift>
      <View style={styles.inner}>
        <ImageHero />
        <LoginContainer />
      </View>
    </KeyboardShift>
  </>
);

const styles = StyleSheet.create({
  container: {},
  inner: {
    flex: 1,
  },
});

export default LoginScreen;
