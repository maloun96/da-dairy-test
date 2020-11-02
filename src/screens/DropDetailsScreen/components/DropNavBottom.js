import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import theme from "theme/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import FullScreenImage from "shared/FullScreenImage";
import CustomButton from "shared/CustomButton";

const IMAGE_OPTIONS = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  base64: true,
  quality: 0.1,
};

const DropNavBottom = ({
  onPress,
  title,
  loading,
  onChangeImage,
  image,
  onShowModal,
  canLock,
  onPressDeliveredAndLock,
  showDropNotes,
}) => {
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const onClick = () => {
    Alert.alert(
      "",
      "",
      [
        {
          text: "Take a photo",
          onPress: takeImage,
        },
        {
          text: "Choose from library",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(IMAGE_OPTIONS);

    if (!result.cancelled) {
      onChangeImage("data:image/jpeg;base64," + result.base64);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync(IMAGE_OPTIONS);

    if (!result.cancelled) {
      onChangeImage("data:image/jpeg;base64," + result.base64);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <View>
          {showDropNotes && (
            <CustomButton
              containerStyle={styles.notes}
              title="ADD NOTES"
              type="outline"
              testID="addNotes"
              onPress={onShowModal}
              titleStyle={{ color: theme.colors.primaryBlue }}
              buttonStyle={styles.btnNotes}
            />
          )}
        </View>
        <View style={styles.rightSide}>
          <Button
            testID="camera"
            buttonStyle={styles.camera}
            onPress={onClick}
            icon={<Icon name="camera" size={22} color={"#fff"} />}
            type="clear"
          />
          {image && (
            <FullScreenImage uri={image}>
              <Image source={{ uri: image }} style={styles.image} />
            </FullScreenImage>
          )}
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <CustomButton
          testID="deliver"
          title={loading ? "LOADING" : title || "DELIVERED"}
          onPress={onPress}
          buttonStyle={styles.btnDelivered}
        />
        {canLock && (
          <CustomButton
            testID="deliver-lock"
            title={loading ? "LOADING" : title || "DELIVERED & LOCK"}
            onPress={onPressDeliveredAndLock}
            containerStyle={styles.containerLockBtn}
            buttonStyle={styles.btnDeliveredLock}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
  },
  buttonsWrapper: {
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 0,
  },
  btnNotes: { borderColor: theme.colors.primaryBlue, backgroundColor: theme.colors.white },
  containerLockBtn: {
    marginTop: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rightSide: { flexDirection: "row" },
  camera: {
    borderRadius: 50,
    padding: 15,
  },
  btnDelivered: { backgroundColor: theme.colors.loginBtn, height: 50 },
  btnDeliveredLock: { height: 50 },
});

export default DropNavBottom;
