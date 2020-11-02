import React from "react";
import CustomButton from "shared/CustomButton";
import theme from "theme/index";
import { StyleSheet, View } from "react-native";

const LogoutButtons = ({onCancel, onConfirm, confirmTitle, cancelTitle}) => (
  <View style={styles.buttons}>
    <CustomButton
      titleStyle={{ color: theme.colors.primaryBlue }}
      buttonStyle={styles.btnWhite}
      type="outline"
      title={cancelTitle || "CANCEL"}
      onPress={onCancel}
    />
    <CustomButton buttonStyle={styles.btnSave} title={confirmTitle || "YES"} onPress={onConfirm} />
  </View>
);

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnSave: {
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: 50,
    width: 123,
  },
  btnWhite: {
    borderColor: theme.colors.primaryBlue,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    width: 123,
  },
});

export default LogoutButtons;
