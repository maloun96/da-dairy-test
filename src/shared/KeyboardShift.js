import React, { Component } from "react";
import { Animated, Keyboard, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0),
  };

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener("keyboardDidShow", this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener("keyboardDidHide", this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { children } = this.props;
    const { shift } = this.state;
    return <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>{children}</Animated.View>;
  }

  handleKeyboardDidShow = (event) => {
    const barH = Constants.statusBarHeight;
    const keyboardHeight = event.endCoordinates.height;
    const gap = keyboardHeight - barH;

    if (gap <= 0) {
      return;
    }
    Animated.timing(this.state.shift, {
      toValue: -gap,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
});
