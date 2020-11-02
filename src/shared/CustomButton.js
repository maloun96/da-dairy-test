import React from "react";
import { Button } from "react-native-elements";
import theme from "theme/index";

const CustomButton = ({ onPress, title, ...props }) => (
  <Button
    testID="customButton"
    disabledStyle={{ backgroundColor: theme.colors.grey }}
    disabledTitleStyle={{ color: theme.colors.white }}
    title={title || "NEXT"}
    onPress={onPress}
    {...props}
  />
);

export default CustomButton;
