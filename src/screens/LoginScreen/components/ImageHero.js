import React from "react";
import { StyleSheet, View, ImageBackground, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ImageHero = () => (
  <View style={[{ width: windowWidth, height: windowHeight / 2 }, styles.container]}>
    <ImageBackground source={require("../../../../assets/login_bg.png")} style={styles.backgroundImage}>
      <Image source={require("../../../../assets/login_logo.png")} style={styles.logo} />
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageHero;
