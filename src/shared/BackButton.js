import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const BackButton = ({ onPress, title, icon }) => (
  <View>
    <Button
      buttonStyle={styles.btn}
      titleStyle={styles.title}
      type="clear"
      icon={icon ? <Icon name="arrow-left" color="#fff" size={14} /> : null}
      title={title || "Back"}
      testID="back"
      onPress={onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "transparent",
    marginHorizontal: 0,
  },
  title: {
    paddingTop: 1,
    paddingBottom: 2,
  },
});

export default BackButton;
