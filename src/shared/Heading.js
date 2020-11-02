import { Text } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import theme from "theme/index";

const Heading = ({ message }) => <Text style={styles.heading}>{message}</Text>;

const styles = StyleSheet.create({
  heading: {
    color: theme.colors.primaryBlue,
    fontSize: theme.textSize.subheader,
    fontWeight: "500",
    alignSelf: "flex-end",
    marginVertical: 15,
    marginRight: 40,
  },
});

export default Heading;
