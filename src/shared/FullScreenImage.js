import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import Lightbox from "react-native-lightbox";
import theme from "theme/index";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);
YellowBox.ignoreWarnings(["Animated.event now requires a second argument for options"]);

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const FullScreenImage = ({ uri, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const renderContent = () => (
    <View style={styles.container}>
      {isVisible && <Image source={{ uri }} style={styles.image} resizeMode="contain" />}
    </View>
  );

  return (
    <Lightbox
      willClose={() => setIsVisible(false)}
      onClose={() => setIsVisible(true)}
      swipeToDismiss={true}
      renderContent={renderContent}
      renderHeader={(close) => (
        <TouchableOpacity onPress={close}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      )}
    >
      {children}
    </Lightbox>
  );
};

const styles = StyleSheet.create({
  image: {
    height: WINDOW_HEIGHT,
  },
  closeButton: {
    padding: 10,
    marginTop: 50,
    marginLeft: 10,
    fontSize: theme.textSize.subheader,
    color: theme.colors.white,
  },
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});

export default FullScreenImage;
