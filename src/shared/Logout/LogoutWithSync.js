import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import LogoutButtons from "shared/Logout/LogoutButtons";

const LogoutWithSync = (props) => (
  <>
    <View style={styles.wrapperUnsynced}>
      <Text>
        Before logging out, please make sure your mobile device is connected to an internet network, in order
        for the data to be synced.
      </Text>
      <Text style={styles.otherwise}> Otherwise data might be lost.</Text>
      <Text>Do you still want to log out of the app?</Text>
    </View>
    <LogoutButtons {...props} />
  </>
);

const styles = StyleSheet.create({
  wrapperUnsynced: {
    marginHorizontal: 15,
  },
  otherwise: {
    fontWeight: "800",
    marginBottom: 20,
  },
});

export default LogoutWithSync;
