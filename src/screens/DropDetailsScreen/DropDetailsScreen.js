import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import withMessage from "shared/withMessage";
import DropNavBottom from "screens/DropDetailsScreen/components/DropNavBottom";
import DropDetailList from "screens/DropDetailsScreen/components/DropDetailList";
import DropDetailInstruction from "screens/DropDetailsScreen/components/DropDetailInstruction";
import { useDispatch, useSelector } from "react-redux";
import { getDropBySortOrder, getToDeliverDrops } from "selectors/preferences.selectors";
import DropDetailModalNotes from "screens/DropDetailsScreen/components/DropDetailModalNotes";
import DropDetailNotes from "screens/DropDetailsScreen/components/DropDetailNotes";
import { useIsFocused } from "@react-navigation/core";
import { DELIVER_AND_LOCK_ENDPOINT, DELIVER_ENDPOINT } from "constants/index";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import preferencesActions from "actions/preferences.action";

const DropDetailsScreen = ({
  route: {
    params: { sortorder },
  },
  navigation,
}) => {
  const dispatch = useDispatch();
  const drop = useSelector((state) => getDropBySortOrder(state, sortorder));
  const preferences = useSelector((state) => state.preferences);
  const { hasLock } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const toDeliverDrops = useSelector((state) => getToDeliverDrops(state));

  useEffect(() => {
    setImage(null);
    setNotes("");
  }, [isFocused]);

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      return { latitude, longitude };
    } else {
      throw new Error("Location is required.");
    }
  };

  const onDeliver = async (endpoint) => {
    try {
      dispatch(preferencesActions.setDropDeliveryLoading(true));
      const location = await getLocation();
      await dispatch(preferencesActions.updateDrop(endpoint, drop, location, image, notes));
      goToNextDrop();
    } catch (e) {
      alert(e);
    }
  };

  const goToNextDrop = () => {
    try {
      const index = toDeliverDrops.findIndex((itemDrop) => itemDrop.drop.sortorder === drop.drop.sortorder);
      const {
        drop: { sortorder },
      } = toDeliverDrops[index + 1];
      navigation.navigate("DropDetails", { sortorder });
    } catch (e) {
      navigation.navigate("DeliveryOnly");
    }
  };

  const hasNotes = notes.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {drop.drop.round_notes !== "" && <DropDetailInstruction message={drop.drop.round_notes} />}
      <DropDetailModalNotes
        isVisible={showNotesModal}
        value={notes}
        onChange={(value) => setNotes(value)}
        onClose={() => setShowNotesModal(false)}
      />
      <DropDetailList
        drop_details={drop.drop_details}
        onPress={(index) => {
          navigation.navigate("StatusItem", {
            drop,
            index,
          });
        }}
      />
      {hasNotes && <DropDetailNotes onPress={() => setShowNotesModal(true)} message={notes} />}
      <DropNavBottom
        showDropNotes={!hasNotes}
        onPress={() => onDeliver(DELIVER_ENDPOINT)}
        loading={preferences.dropDeliveryLoading}
        onChangeImage={(image) => setImage(image)}
        onShowModal={() => setShowNotesModal(true)}
        onPressDeliveredAndLock={() => onDeliver(DELIVER_AND_LOCK_ENDPOINT)}
        canLock={hasLock && drop.drop.use_address}
        image={image}
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

DropDetailsScreen.displayName = "DropDetailsScreen";

export default withMessage(DropDetailsScreen);
