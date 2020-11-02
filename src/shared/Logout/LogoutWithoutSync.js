import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import LogoutButtons from "shared/Logout/LogoutButtons";

const LogoutWithoutSync = (props) => (
  <>
    <Text style={styles.textSynced}>Are you sure you want to log out ?</Text>
    <LogoutButtons {...props} />
  </>
);

const styles = StyleSheet.create({
  textSynced: {
    alignSelf: "center",
  },
});

export default LogoutWithoutSync;
