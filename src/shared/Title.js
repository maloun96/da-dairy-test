import { Text } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import theme from "theme/index";

const Title = ({ title, style = {}, fitInOneRow }) => (
  <Text style={[styles.heading, style]} {...(fitInOneRow && { numberOfLines: 1 })}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    fontSize: theme.textSize.screen,
    fontWeight: "800",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    color: theme.colors.white,
  },
});

export default Title;
