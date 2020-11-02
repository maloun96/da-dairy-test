import { Platform } from "react-native";
import { colors } from "react-native-elements";

const theme = {
  backgroundColor: "#fff",
  primary: "#0282A9",
  card: "#fff",
  text: "#000",
  border: "#000028",
  notification: "#9933FF",
  info: "#FFC700",
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
    primaryBlue: "#0282A9",
    white: "#fff",
    grey: "#c6c6c6",
    disabledBtn: "#D9D9D9",
    yellow: "#ff9800",
    black: "#000",
    loginBtn: "#15AF00",
    backgroundCheckBox: "#fff",
    inputGrey: "#C4C4C4",
  },
  Text: {
    style: {
      color: "#000",
    },
  },
  CheckBox: {
    containerStyle: {
      backgroundColor: "#fff",
      marginLeft: 0,
      marginRight: 0,
    },
  },
  Icon: {
    iconStyle: {
      color: "#C4C4C4",
    },
  },
  Input: {
    inputStyle: {
      color: "#2F3035",
    },
    inputContainerStyle: {
      backgroundColor: "#FAFAFA",
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
    },
    containerStyle: {
      paddingHorizontal: 10,
    },
    placeholderStyle: {
      fontSize: 16,
      color: "#C4C4C4",
    },
    labelStyle: { color: "#000", fontSize: 12, paddingBottom: 5 },
  },
  Button: {
    titleStyle: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "400",
    },
    buttonStyle: {
      backgroundColor: "#0282A9",
      borderRadius: 50,
      marginHorizontal: 10,
    },
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    circle: "100%",
  },
  textSize: {
    small: 10,
    body: 12,
    paragraph: 14,
    subheader: 16,
    title: 18,
    screen: 24,
    xlarge: 26,
  },
};

export default theme;
