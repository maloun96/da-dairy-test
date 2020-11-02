import React, { useState } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import withMessage from "shared/withMessage";
import CustomButton from "shared/CustomButton";
import { Input, CheckBox, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import actions from "actions/auth.action";
import theme from "theme/index";

const LOCK_DOWN_PERIOD = 10;

const InputIcon = ({ onPress }) => <Icon type="font-awesome" name="times-circle" onPress={onPress} size={16} />;

const LoginContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { actions: syncActions } = useSelector((state) => state.sync);

  const toggleSwitch = () => setRememberMe((previousState) => !previousState);

  const logIn = () => {
    if (!canLogIn()) {
      return;
    }
    Keyboard.dismiss();
    dispatch(actions.login(username, password, rememberMe));
  };

  const canLogIn = () => {
    const { startLockDown } = auth;

    if (syncActions.length) {
      return false;
    }

    if (!startLockDown) {
      return true;
    }

    const diff = Date.now() - startLockDown;
    const minutes = Math.floor(diff / 1000 / 60);
    const difference = LOCK_DOWN_PERIOD - minutes;

    if (minutes < LOCK_DOWN_PERIOD) {
      dispatch(actions.setAuthError(`Too many attempts, retry in ${difference} minutes`));
      return false;
    }

    dispatch(actions.resetLoginAttempt());

    return true;
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your username"
        label="Username"
        leftIcon={<Icon type="font-awesome" name="envelope" size={20} />}
        onChangeText={(e) => setUsername(e)}
        value={username}
        rightIcon={<InputIcon onPress={() => setUsername("")} />}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={<Icon type="font-awesome" name="lock" size={24} />}
        onChangeText={(e) => setPassword(e)}
        value={password}
        secureTextEntry={true}
        rightIcon={<InputIcon onPress={() => setPassword("")} />}
      />
      <CheckBox
        title="Remember me"
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        checkedColor="#0282A9"
        onPress={toggleSwitch}
        checked={rememberMe}
        containerStyle={styles.rememberMe}
      />
      <CustomButton title="LOGIN" buttonStyle={styles.loginBtn} onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop: 45,
  },
  rememberMe: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 10,
    marginBottom: 20,
  },
  loginBtn: { height: 50, backgroundColor: theme.colors.loginBtn },
});

LoginContainer.displayName = "LoginContainer";

export default withMessage(LoginContainer);
