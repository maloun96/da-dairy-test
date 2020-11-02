import React, { useEffect, useState } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Modal, { ModalContent } from "react-native-modals";
import { Text } from "react-native-elements";
import theme from "theme/index";
import Sync from "shared/Logout/Sync";
import LogoutWithoutSync from "shared/Logout/LogoutWithoutSync";
import LogoutWithSync from "shared/Logout/LogoutWithSync";
import authActions from "actions/auth.action";

const Logout = () => {
  const dispatch = useDispatch();
  const { actions: syncActions, isSync } = useSelector((state) => state.sync);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [ showSync, setShowSync ] = useState(false);

  useEffect(() => {
    return () => {
      if (!showLogoutModal) {
        setShowSync(false);
      }
    };
  }, [showLogoutModal]);


  const onCloseModal = () => {
    setShowLogoutModal(false);
  }

  const logout = async () => {
    setShowLogoutModal(false);
    await AsyncStorage.removeItem("sessionid");
    dispatch(authActions.logout());
  };

  const startSync = async () => {
    setShowSync(true);
  };

  return (
    <View>
      <Modal
        visible={showLogoutModal}
        width={0.8}
        modalTitle={
          <View style={styles.modalTitle}>
            <Text style={styles.titleModal}>Logout</Text>
          </View>
        }
        useNativeDriver={true}
      >
        <ModalContent>
          {showSync && <Sync isSync={isSync} syncActions={syncActions} onConfirm={logout} onCloseModal={onCloseModal}/>}
          {!showSync && syncActions.length === 0 && <LogoutWithoutSync onCancel={onCloseModal} onConfirm={logout} />}
          {!showSync && syncActions.length > 0 && <LogoutWithSync onCancel={onCloseModal} onConfirm={startSync} />}
        </ModalContent>
      </Modal>
      <Button
        testID="logout"
        titleStyle={styles.titleBtn}
        buttonStyle={styles.btnLogout}
        onPress={() => setShowLogoutModal(true)}
        type="clear"
        title="Logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnLogout: {
    padding: 0,
    backgroundColor: "transparent"
  },
  titleBtn: {
    paddingTop: 1,
    paddingBottom: 2,
  },
  modalTitle: {
    paddingVertical: 20,
    alignSelf: "center",
  },
  titleModal: {
    fontSize: theme.textSize.title,
    fontWeight: "800",
  },
});

export default Logout;
