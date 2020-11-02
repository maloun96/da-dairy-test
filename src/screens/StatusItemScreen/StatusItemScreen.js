import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import withMessage from "shared/withMessage";
import theme from "theme/index";
import { DROP_ITEM_STATUSES } from "constants/index";
import actions from "actions/index.actions";
import CheckBoxItem from "shared/CheckBoxItem";
import CustomButton from "shared/CustomButton";
import DropDetailModalNotes from "screens/DropDetailsScreen/components/DropDetailModalNotes";
import { useDispatch } from "react-redux";

const StatusItemScreen = ({ navigation, route }) => {
  const { drop, index } = route.params;
  const drop_detail = drop.drop_details[index];
  const [status, setStatus] = useState(drop_detail.deliverystatusid);
  const [notes, setNotes] = useState(drop_detail.itemnote);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    try {
      await dispatch(actions.updateDropDetail(drop, index, status, notes));
      navigation.goBack();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.listView}>
        <CheckBoxItem
          title="Awaiting Delivery"
          isSelected={status === DROP_ITEM_STATUSES.NORMAL}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.NORMAL);
          }}
        />
        <CheckBoxItem
          title="Missing"
          isSelected={status === DROP_ITEM_STATUSES.MISSING}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.MISSING);
          }}
        />
        <CheckBoxItem
          title="Damaged: Not Delivered"
          isSelected={status === DROP_ITEM_STATUSES.DAMAGED_NOT_DELIVERED}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.DAMAGED_NOT_DELIVERED);
          }}
        />
        <CheckBoxItem
          title="Damaged: Delivered"
          isSelected={status === DROP_ITEM_STATUSES.DAMAGED_DELIVERED}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.DAMAGED_DELIVERED);
          }}
        />
        <CheckBoxItem
          title="Other"
          isSelected={status === DROP_ITEM_STATUSES.OTHER}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.OTHER);
          }}
        />
        <CheckBoxItem
          title="Delivered"
          isSelected={status === DROP_ITEM_STATUSES.DELIVERED}
          onPress={() => {
            setStatus(DROP_ITEM_STATUSES.DELIVERED);
          }}
        />
      </ScrollView>
      <DropDetailModalNotes
        isVisible={showNotesModal}
        value={notes}
        onChange={(value) => setNotes(value)}
        onClose={() => setShowNotesModal(false)}
      />
      <View style={styles.btnContainer}>
        <CustomButton
          containerStyle={styles.notes}
          title="ADD NOTES"
          type="outline"
          onPress={() => setShowNotesModal(true)}
          titleStyle={{ color: theme.colors.primaryBlue }}
          buttonStyle={styles.btnNotes}
        />
        <CustomButton title="SAVE" onPress={onSubmit} buttonStyle={styles.btnSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  listView: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  btnContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    paddingTop: 10,
  },
  notes: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  btnNotes: { borderColor: theme.colors.primaryBlue, backgroundColor: theme.colors.white },
  btnSave: { backgroundColor: theme.colors.loginBtn, height: 50 },
});

StatusItemScreen.displayName = "StatusItemScreen";

export default withMessage(StatusItemScreen);
