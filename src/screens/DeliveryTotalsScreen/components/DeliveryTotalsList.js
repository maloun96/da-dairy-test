import React from "react";
import { ListItem, Text } from "react-native-elements";
import { StyleSheet, FlatList, View } from "react-native";
import EmptyList from "shared/EmptyList";
import theme from "theme/index";
import { useTheme } from "@react-navigation/native";

const DeliveryTotalsList = ({ list }) => {
  const { colors } = useTheme();

  const renderItem = ({ item: { title, qty, left }, index }) => (
    <ListItem containerStyle={[styles.listContainer, index % 2 ? { backgroundColor: colors.backgroundEven } : {}]}>
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
      </ListItem.Content>
      <Text style={styles.listItemTitle}>{qty}</Text>
      <Text style={[styles.listItemTitle, styles.listItemLeft]}>{left}</Text>
    </ListItem>
  );

  return (
    <>
      {list.length === 0 && <EmptyList message={"There are no products to deliver on this round."} />}
      {list.length > 0 && (
        <View style={styles.container}>
          <ListItem containerStyle={styles.listContainerTop}>
            <ListItem.Content>
              <ListItem.Title style={styles.label}>
                <Text>PRODUCT</Text>
              </ListItem.Title>
            </ListItem.Content>
            <Text style={styles.label}>REQUIRED</Text>
            <Text style={[styles.label, styles.labelLeft]}>LEFT</Text>
          </ListItem>
          <FlatList keyExtractor={(item, index) => index.toString()} data={list} renderItem={renderItem} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 40,
    fontSize: theme.textSize.paragraph,
    height: 50,
  },
  listItemTitle: {
    fontSize: theme.textSize.paragraph,
  },
  listItemLeft: {
    width: 15,
    marginLeft: 65,
  },
  listContainerTop: {
    paddingHorizontal: 40,
  },
  label: {
    fontSize: theme.textSize.small,
  },
  labelLeft: {
    marginLeft: 35,
  },
});

export default DeliveryTotalsList;
