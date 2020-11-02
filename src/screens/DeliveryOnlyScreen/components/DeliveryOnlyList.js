import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import theme from "theme/index";
import EmptyList from "shared/EmptyList";
import { DROP_STATUSES } from "constants/index";

const DeliveryOnlyList = ({ list, onPress }) => {
  const renderItem = ({ item }) => (
    <ListItem underlayColor="transparent" containerStyle={styles.drop} onPress={() => onPress(item)} pad={2}>
      <Icon iconStyle={{ color: theme.colors.primaryBlue }} size={25} testID="map" type="material-icon" name="place" />
      <ListItem.Content>
        <ListItem.Title>{item.drop.address1}</ListItem.Title>
      </ListItem.Content>
      {item.drop.deliverystatusid === DROP_STATUSES.COMPLETE && (
        <Icon type="font-awesome" name="check" size={19} iconStyle={{ color: theme.colors.loginBtn }} />
      )}
      {item.drop.deliverystatusid === DROP_STATUSES.PARTIAL && (
        <Icon type="material-icon" name="error" size={19} iconStyle={{ color: theme.info }} />
      )}
    </ListItem>
  );

  return (
    <>
      {list.length === 0 && <EmptyList message={"Round completed."} icon="check-circle" color="#219653" />}
      {list.length > 0 && (
        <View style={styles.container}>
          <FlatList keyExtractor={(item, index) => index.toString()} data={list} renderItem={renderItem} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 40, flex: 1 },
  drop: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.inputGrey,
  },
});

export default DeliveryOnlyList;
