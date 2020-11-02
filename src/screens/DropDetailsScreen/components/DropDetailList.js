import React from "react";
import EmptyList from "shared/EmptyList";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "theme/index";
import DropDetailItem from "screens/DropDetailsScreen/components/DropDetailItem";

const DropDetailList = ({ drop_details, onPress }) => {
  return (
    <>
      {drop_details.length === 0 && <EmptyList message={"There are no delivery available for you"} />}
      {drop_details.length > 0 && (
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={drop_details}
            renderItem={({ item, index }) => <DropDetailItem item={item} index={index} onPress={onPress} />}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: theme.textSize.paragraph,
    height: 50,
    flexGrow: 1,
  },
});

export default DropDetailList;
