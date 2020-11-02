import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "shared/CustomButton";
import theme from "theme/index";

const NavBottom = ({ nextBtn, disabled, title, ...restProps }) => (
  <View style={styles.container}>
    <CustomButton
      buttonStyle={styles.height}
      onPress={nextBtn}
      title={title}
      color={disabled ? theme.colors.disabledBtn : theme.colors.primaryBlue}
      disabled={disabled}
      {...restProps}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginBottom: 20,
    paddingTop: 20,
  },
  height: {
    height: 50,
  },
});

export default NavBottom;
