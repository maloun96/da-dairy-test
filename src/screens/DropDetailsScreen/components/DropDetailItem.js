import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Text, Icon } from "react-native-elements";
import theme from "theme/index";
import { DROP_ITEM_STATUSES } from "constants/index";

const { MISSING, DAMAGED_NOT_DELIVERED, OTHER } = DROP_ITEM_STATUSES;

const isNotDelivered = (status) => [MISSING, DAMAGED_NOT_DELIVERED, OTHER].includes(status);

const DropDetailItem = ({ item, index, onPress }) => (
  <ListItem underlayColor="transparent" onPress={() => onPress(index)} containerStyle={styles.container}>
    <Icon type="font-awesome" name="newspaper-o" size={19} iconStyle={{ color: theme.primary }} />
    <ListItem.Content>
      <ListItem.Title>{item.title}</ListItem.Title>
    </ListItem.Content>
    {isNotDelivered(item.deliverystatusid) && (
      <Icon type="material-icon" name="error" size={19} iconStyle={{ color: theme.info }} />
    )}

    <Text style={styles.quantity}>{item.nbrdeliveries}</Text>
  </ListItem>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: theme.colors.inputGrey,
  },
  quantity: { backgroundColor: theme.colors.inputGrey, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
});

export default DropDetailItem;
