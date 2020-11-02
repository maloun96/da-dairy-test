import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CheckBoxItem from "shared/CheckBoxItem";
import EmptyList from "shared/EmptyList";
import NavBottom from "shared/NavBottom";

const DatasetList = ({ datasets, selectedDataset, onPress, onRefresh, onNextScreen }) => (
  <>
    {datasets.length === 0 && <EmptyList message={"There are no current datasets."} onRefresh={onRefresh} />}
    {datasets.length > 0 && (
      <>
        <ScrollView style={styles.listView}>
          {datasets.map((dataset) => (
            <CheckBoxItem
              key={dataset.deliveryhistoryid + dataset.type}
              title={dataset.display}
              titleProps={{ numberOfLines: 1, ellipsizeMode: "tail" }}
              isSelected={
                dataset.deliveryhistoryid === selectedDataset?.deliveryhistoryid &&
                dataset.type === selectedDataset?.type
              }
              onPress={() => onPress(dataset)}
            />
          ))}
        </ScrollView>
        <NavBottom nextBtn={onNextScreen} disabled={!selectedDataset} />
      </>
    )}
  </>
);

const styles = StyleSheet.create({
  listView: {
    marginTop: 30,
    marginHorizontal: 25,
  },
});

export default DatasetList;
