import React from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import BackButton from "shared/BackButton";
import Logout from "shared/Logout/Logout";
import { LinearGradient } from "expo-linear-gradient";
import Title from "shared/Title";
import Constants from "expo-constants";
import theme from "theme/index";

const isIOS = Platform.OS === "ios";

const GradientLayout = (props) => {
  const headerTitle = props.scene.descriptor.options.headerTitle || props.title;
  const { titleBack, onPressBack, icon, fitInOneRow } = props;

  return (
    <View>
      <LinearGradient colors={["#077394", "#00AEDA"]} start={{ x: 0.7, y: 0 }} style={styles.gradient}>
        <View style={onPressBack ? styles.buttons : styles.button}>
          {onPressBack && <BackButton onPress={onPressBack} icon title={titleBack ? titleBack : null} />}
          <Logout />
        </View>
        <View style={styles.titleContainer}>
          <Title fitInOneRow={fitInOneRow} style={fitInOneRow ? styles.roundName : styles.title} title={headerTitle} />
          {icon}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: { paddingTop: isIOS ? Constants.statusBarHeight : StatusBar.currentHeight },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, alignItems: "center" },
  button: { flexDirection: "row", justifyContent: "flex-end", marginHorizontal: 10 },
  titleContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 35, alignItems: "center" },
  title: { fontSize: theme.textSize.subheader, paddingVertical: 20, width: "80%" },
  roundName: { fontSize: theme.textSize.title, paddingVertical: 20 },
});

export default GradientLayout;
