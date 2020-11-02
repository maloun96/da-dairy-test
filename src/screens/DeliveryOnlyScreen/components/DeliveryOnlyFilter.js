import React, { useState } from "react";
import FilterButton from "screens/DeliveryOnlyScreen/components/FilterButton";
import { StyleSheet, View } from "react-native";
import forEach from "lodash/fp/forEach";
import { useTheme } from "@react-navigation/native";

const DeliveryOnlyFilter = ({ onChange }) => {
  const { colors } = useTheme();
  const [buttons, setButtons] = useState({
    todeliver: true,
    alldrops: false,
    incomplete: false,
  });

  const setActiveButton = (active) => {
    const resetBtns = forEach(buttons, function (key) {
      buttons[key] = false;
    });
    setButtons({ ...resetBtns, [active]: true });
    onChange(active);
  };

  return (
    <View style={[styles.tabs, { backgroundColor: colors.backgroundDeliverOnly }]}>
      <FilterButton
        isActive={buttons["todeliver"]}
        title="To deliver"
        type="outline"
        onPress={() => setActiveButton("todeliver")}
      />
      <FilterButton
        isActive={buttons["alldrops"]}
        title="All"
        type="outline"
        onPress={() => setActiveButton("alldrops")}
      />
      <FilterButton
        isActive={buttons["incomplete"]}
        title="Incomplete"
        type="outline"
        onPress={() => setActiveButton("incomplete")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default DeliveryOnlyFilter;
