import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "theme/index";
import { Text } from "react-native-elements";
import { runActions } from "utils/sync";
import LogoutButtons from "shared/Logout/LogoutButtons";

const Sync = ({isSync, syncActions, onConfirm, onCloseModal}) => {
  useEffect(() => {
    runActions();
  }, []);

  const inProgress = (
    <View style={styles.fullWidth}>
      <View style={styles.completeContainer}>
        <Text style={styles.syncText}>
          Sync in progress ({syncActions.length})
        </Text>
        <Icon
          name="refresh"
          size={22}
          color={theme.colors.primaryBlue}
        />
      </View>
    </View>
  );

  const completed = (
    <View style={styles.fullWidth}>
      <View style={styles.completeContainer}>
        <Text style={styles.syncText}>
          Sync complete
        </Text>
        <Icon
          name="check"
          size={22}
          color={theme.colors.primaryBlue}
        />
      </View>
      <LogoutButtons
        cancelTitle="CLOSE"
        confirmTitle="LOGOUT"
        onCancel={onCloseModal}
        onConfirm={onConfirm}
      />
    </View>
  );

  return (
    <View style={styles.syncContainer}>
      {isSync ? inProgress : completed}
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {width: "100%"},
  syncContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0
  },
  syncText: {
    fontSize: theme.textSize.subheader
  },
  completeContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default React.memo(Sync);
