import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import withMessage from "shared/withMessage";
import DeliveryOnlyList from "screens/DeliveryOnlyScreen/components/DeliveryOnlyList";
import { useSelector } from "react-redux";
import { getAllDrops, getCompletedDrops, getIncompleteDrops, getToDeliverDrops } from "selectors/preferences.selectors";
import DeliveryOnlyFilter from "screens/DeliveryOnlyScreen/components/DeliveryOnlyFilter";
import Heading from "shared/Heading";

const DeilveryOnlyScreen = ({ navigation }) => {
  const incompleteDrops = useSelector((state) => getIncompleteDrops(state));
  const allDrops = useSelector((state) => getAllDrops(state));
  const toDeliverDrops = useSelector((state) => getToDeliverDrops(state));
  const completedDrops = useSelector((state) => getCompletedDrops(state));
  const [type, setType] = useState("todeliver");

  const updateList = (type) => setType(type);

  const getList = () => {
    if (type === "incomplete") {
      return incompleteDrops;
    }

    if (type === "alldrops") {
      return allDrops;
    }

    return toDeliverDrops;
  };

  return (
    <SafeAreaView style={styles.container}>
      <DeliveryOnlyFilter onChange={updateList} />
      <Heading message={`${allDrops.length - completedDrops.length} of ${allDrops.length} remaining`} />
      <DeliveryOnlyList
        list={getList()}
        onPress={({ drop: { sortorder } }) => {
          navigation.navigate("DropDetails", {
            sortorder,
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});

DeilveryOnlyScreen.displayName = "DeilveryOnlyScreen";

export default withMessage(DeilveryOnlyScreen);
