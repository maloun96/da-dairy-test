import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

const FilterButton = ({ isActive, ...props }) => {
  const { colors } = useTheme();

  return (
    <Button
      titleStyle={{ ...(isActive && { color: colors.textBtnDeliveryOnly }) }}
      buttonStyle={{
        ...styles.btnFilter,
        ...{ backgroundColor: isActive ? colors.bgBtnDeliveryOnly : colors.backgroundDeliverOnly },
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  btnFilter: {
    borderRadius: 5,
    paddingHorizontal: 25,
    borderWidth: 0,
  },
});

export default FilterButton;
