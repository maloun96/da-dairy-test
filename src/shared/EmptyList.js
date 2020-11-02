import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import CustomButton from "shared/CustomButton";
import theme from "theme/index";

const EmptyList = ({ message, onRefresh, icon = "highlight-off", color }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Icon type="material-icon" name={icon} size={80} iconStyle={[styles.icon, { color: color || colors.grey }]} />
        <Text style={[styles.text, { color: colors.black }]}>{message}</Text>
      </View>
      {onRefresh && <CustomButton buttonStyle={styles.btn} onPress={onRefresh} title="REFRESH" type="outline" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: theme.textSize.subheader,
  },
  btn: {
    height: 50,
  },
  icon: {
    marginBottom: 35,
  },
});

export default EmptyList;
