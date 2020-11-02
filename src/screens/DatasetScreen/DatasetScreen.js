import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import withMessage from "shared/withMessage";
import Loading from "shared/Loading";
import { useDispatch, useSelector } from "react-redux";
import actions from "actions/preferences.action";
import DatasetList from "screens/DatasetScreen/components/DatasetList";

const DatasetScreen = ({ navigation }) => {
  const { datasets, loadingDataset, selectedDataset } = useSelector((state) => state.preferences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadDatasets());
  }, []);

  const onNextScreen = () => {
    if (selectedDataset?.deliveryhistoryid) {
      navigation.navigate("ChooseRound");
    }
  };

  if (loadingDataset) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DatasetList
        datasets={datasets}
        selectedDataset={selectedDataset}
        onNextScreen={onNextScreen}
        onPress={(dataset) => dispatch(actions.selectDataset(dataset))}
        onRefresh={() => dispatch(actions.loadDatasets())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

DatasetScreen.displayName = "DatasetScreen";

export default withMessage(DatasetScreen);
