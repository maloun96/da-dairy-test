import { Text, Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import theme from "theme/index";
import CustomButton from "shared/CustomButton";
import React, { useState, useEffect } from "react";
import Modal, { ModalContent } from "react-native-modals";

const MAX_INPUT_LENGTH = 80;

const DropDetailModalNotes = ({ isVisible, onChange, onClose, value }) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(value);
  }, [isVisible]);

  return (
    <View>
      <Modal
        visible={isVisible}
        onTouchOutside={onClose}
        width={0.8}
        modalTitle={
          <View style={styles.modalTitle}>
            <Text style={styles.titleModal}>{value.length > 0 ? "Edit Notes" : "Add Notes"}</Text>
            <Text style={styles.titleCounter}>
              {notes.length} / {MAX_INPUT_LENGTH}
            </Text>
          </View>
        }
        useNativeDriver={true}
      >
        <ModalContent>
          <Input
            multiline
            placeholder={"Enter your notes"}
            value={notes}
            onChangeText={(t) => setNotes(t)}
            style={styles.inputContainer}
            height={100}
            maxLength={MAX_INPUT_LENGTH}
            inputContainerStyle={styles.noBorder}
          />
          <View style={styles.buttons}>
            {value.length > 0 && (
              <CustomButton
                titleStyle={{ color: theme.colors.primaryBlue }}
                buttonStyle={styles.btnWhite}
                title="CLEAR NOTES"
                onPress={() => setNotes("")}
              />
            )}
            <View style={styles.wrapperBtn}>
              <CustomButton
                titleStyle={{ color: theme.colors.primaryBlue }}
                buttonStyle={[styles.borderBtn, styles.btnWhite]}
                type="outline"
                title="CANCEL"
                onPress={onClose}
              />
              <CustomButton
                buttonStyle={[styles.borderBtn, styles.btnSave]}
                title={value.length > 0 ? "SAVE" : "ADD "}
                onPress={() => {
                  onChange(notes);
                  onClose();
                }}
              />
            </View>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey,
  },
  noBorder: {
    width: "100%",
    marginLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
  },
  modalTitle: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleModal: {
    fontSize: theme.textSize.title,
  },
  titleCounter: {
    fontSize: theme.textSize.title,
    color: theme.colors.grey,
  },
  borderBtn: {
    width: 110,
    borderWidth: 0,
  },
  btnSave: {
    margin: 4,
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: 50,
  },
  btnWhite: {
    margin: 4,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  wrapperBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 10,
  },
});

export default DropDetailModalNotes;
