import React from "react";
import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import theme from "theme/index";
import { useTheme } from "@react-navigation/native";

const CheckBoxItem = ({ isSelected, onPress, ...props }) => {
  const { colors } = useTheme();

  return (
    <CheckBox
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checkedColor={theme.colors.white}
      checked={isSelected}
      containerStyle={[
        { backgroundColor: colors.bgGrey },
        isSelected ? styles.selectedContainerCheckBox : styles.containerCheckBox,
      ]}
      textStyle={[{ color: colors.checkboxText }, isSelected ? styles.textSelectedCheckBox : styles.textCheckBox]}
      onPress={onPress}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  selectedContainerCheckBox: {
    backgroundColor: theme.colors.primaryBlue,
    borderWidth: 0,
    padding: 18,
    borderColor: theme.colors.inputGrey,
  },
  textSelectedCheckBox: {
    color: theme.colors.white,
    fontSize: theme.textSize.paragraph,
  },
  textCheckBox: {
    fontSize: theme.textSize.paragraph,
  },
  containerCheckBox: {
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.inputGrey,
  },
});

export default CheckBoxItem;
