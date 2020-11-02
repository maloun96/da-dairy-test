import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import theme from "theme/index";
import ReadMore from "shared/ReadMore";

const DropDetailInstruction = ({ message }) => {
  return (
    <View style={styles.alert}>
      <Icon type="material-icon" name="error-outline" size={18} iconStyle={styles.icon} />
      <ReadMore
        seeMoreStyle={styles.seeToggleBtn}
        seeLessStyle={styles.seeToggleBtn}
        style={styles.info}
        numberOfLines={2}
        seeLessText="Hide"
        backgroundColor={theme.info}
        wrapperStyle={styles.containerReadMode}
      >
        {message}
      </ReadMore>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: theme.info,
    padding: 10,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  seeToggleBtn: { fontWeight: "800" },
  containerReadMode: { marginRight: 20, marginLeft: 5 },
  info: {
    color: theme.colors.black,
    fontSize: theme.textSize.subheader,
  },
  icon: {
    color: theme.colors.black,
  },
});

export default DropDetailInstruction;
