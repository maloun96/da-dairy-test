import React from "react";
import { StyleSheet, Platform, Linking, Alert } from "react-native";
import { Icon } from "react-native-elements";
import theme from "theme/index";
import { useSelector } from "react-redux";
import { getDropBySortOrder } from "selectors/preferences.selectors";
import GradientLayout from "shared/GradientLayout";

const DropDetailGradient = (props) => {
  const { sortorder } = props.scene.descriptor.options;
  const drop = useSelector((state) => getDropBySortOrder(state, sortorder));

  const onClickNav = () => {
    try {
      const scheme = Platform.OS === "ios" ? "maps:0,0?q=" : "geo:0,0?q=";
      const url = scheme + getMapUrl();

      openExternalApp(url);
    } catch (e) {
      alert("Error. Address not found.");
    }
  };

  const getMapUrl = () => {
    const { location, address1 } = drop.drop;

    if (!location) {
      return address1;
    }

    return `${location.lat},${location.lon}`;
  };

  const openExternalApp = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("ERROR", "Unable to open: " + url, [{ text: "OK" }]);
      }
    });
  };

  return (
    <GradientLayout
      {...props}
      title={drop.drop.address1}
      icon={
        <Icon
          containerStyle={styles.containerIcon}
          iconStyle={styles.iconStyle}
          testID="map"
          type="material-icon"
          name="place"
          onPress={onClickNav}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  containerIcon: {
    marginVertical: 10,
    marginLeft: 20,
  },
  iconStyle: {
    backgroundColor: theme.colors.black,
    fontSize: theme.textSize.xlarge,
    color: theme.colors.white,
    padding: 10,
    borderRadius: 50,
  },
});

export default DropDetailGradient;
