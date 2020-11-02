import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import theme from "theme/index";
import { useTheme } from "@react-navigation/native";

const DropDetailNotes = ({ message, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.wrapper, { backgroundColor: colors.backgroundDeliverOnly }]} onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
      <Icon type="material-icon" name="edit" size={24} iconStyle={{ color: colors.primary }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.grey,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.textSize.subheader,
  },
});

export default DropDetailNotes;
