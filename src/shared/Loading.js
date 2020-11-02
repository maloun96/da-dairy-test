import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
});

export default Loading;
