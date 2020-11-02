import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import NavBottom from "shared/NavBottom";
import { useSelector } from "react-redux";
import withMessage from "shared/withMessage";
import DeliveryTotalsList from "./components/DeliveryTotalsList";
import { DROP_ITEM_STATUSES } from "constants/index";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import flatten from "lodash/fp/flatten";
import groupBy from "lodash/fp/groupBy";

const DeilveryTotalsScreen = ({ navigation }) => {
  const drops = useSelector((state) => state.preferences.selectedRound.drops);
  const { selectedRound } = useSelector((state) => state.preferences);

  const getList = () =>
    flow(
      map((drop) => drop.drop_details),
      flatten,
      groupBy("publicationid"),
      map((item) => ({
        publicationid: item[0].publicationid,
        title: item[0].title,
        qty: item.length,
        left: item.filter(
          (drop_detail) =>
            drop_detail.deliverystatusid !== DROP_ITEM_STATUSES.DELIVERED &&
            drop_detail.deliverystatusid !== DROP_ITEM_STATUSES.DAMAGED_DELIVERED
        ).length,
      }))
    )(drops);

  const list = getList();

  return (
    <SafeAreaView style={styles.container}>
      <DeliveryTotalsList list={list} />
      <NavBottom
        disabled={list.length === 0}
        nextBtn={() =>
          navigation.navigate("DeliveryOnly", {
            selectedRound,
          })
        }
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

DeilveryTotalsScreen.displayName = "DeilveryTotalsScreen";

export default withMessage(DeilveryTotalsScreen);
