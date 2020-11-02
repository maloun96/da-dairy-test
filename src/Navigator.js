import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "screens/LoginScreen/LoginScreen";
import DatasetScreen from "screens/DatasetScreen/DatasetScreen";
import ChooseRoundScreen from "screens/ChooseRoundScreen/ChooseRoundScreen";
import DeliveryTotalsScreen from "screens/DeliveryTotalsScreen/DeliveryTotalsScreen";
import DeliveryOnlyScreen from "screens/DeliveryOnlyScreen/DeliveryOnlyScreen";
import DropDetailsScreen from "screens/DropDetailsScreen/DropDetailsScreen";
import StatusItemScreen from "screens/StatusItemScreen/StatusItemScreen";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { runActions } from "utils/sync";
import actions from "actions/index.actions";
import { navigationRef } from "utils/navigationRef";
import * as RootNavigation from "utils/navigationRef";
import GradientLayout from "shared/GradientLayout";
import DropDetailGradient from "screens/DropDetailsScreen/components/DropDetailGradient";
import { useColorScheme } from "react-native-appearance";
import MyDark from "theme/colorsDark";
import MyLight from "theme/colorsLight";
import authActions from "actions/auth.action";

const Stack = createStackNavigator();

const Navigator = () => {
  const {
    auth: { user, remember },
    nav: { name, params },
    preferences: { selectedDataset, dropDeliveryLoading },
  } = useSelector((state) => state);

  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    checkRemember();
    checkFirstRoute();

    const unsubscribe = NetInfo.addEventListener(runActions);
    const interval = setInterval(runActions, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const checkRemember = () => {
    if (!remember) {
      dispatch(authActions.logout());
    }
  };

  const checkFirstRoute = () => {
    if (!user) {
      return;
    }

    if (name && isDatasetToday()) {
      RootNavigation.navigate(name, params);
    }
  };

  const isDatasetToday = () => {
    const today = new Date().toISOString().slice(0, 10);

    return today === selectedDataset.iso_activeday;
  };

  const onChangeRoute = ({ route }) => dispatch(actions.setNav(route));
  const themeStyle = colorScheme === "light" ? MyLight : MyDark;

  return (
    <NavigationContainer ref={navigationRef} theme={themeStyle}>
      <Stack.Navigator>
        {!user && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={() => ({
              header: () => null,
            })}
          />
        )}
        {user && (
          <>
            <Stack.Screen
              name="Dataset"
              component={DatasetScreen}
              options={() => ({
                header: (props) => <GradientLayout {...props} />,
                headerTitle: "Choose Dataset",
              })}
            />
            <Stack.Screen
              name="ChooseRound"
              component={ChooseRoundScreen}
              listeners={onChangeRoute}
              options={({ navigation }) => ({
                header: (props) => <GradientLayout onPressBack={() => navigation.navigate("Dataset")} {...props} />,
                headerTitle: "Choose Round",
              })}
            />
            <Stack.Screen
              name="DeliveryTotals"
              component={DeliveryTotalsScreen}
              listeners={onChangeRoute}
              options={({ navigation }) => ({
                header: (props) => <GradientLayout onPressBack={() => navigation.navigate("ChooseRound")} {...props} />,
                headerTitle: "Delivery Totals",
              })}
            />
            <Stack.Screen
              name="DeliveryOnly"
              component={DeliveryOnlyScreen}
              listeners={onChangeRoute}
              options={({ navigation, route }) => ({
                header: (props) => (
                  <GradientLayout fitInOneRow onPressBack={() => navigation.navigate("DeliveryTotals")} {...props} />
                ),
                headerTitle: route.params.selectedRound.round.roundname || "Delivery Only",
              })}
            />
            <Stack.Screen
              name="DropDetails"
              component={DropDetailsScreen}
              listeners={onChangeRoute}
              options={({ route, navigation }) => ({
                header: (props) => (
                  <DropDetailGradient
                    onPressBack={() => {
                      if (dropDeliveryLoading) {
                        return;
                      }

                      navigation.navigate("DeliveryOnly");
                    }}
                    titleBack="Round"
                    {...props}
                  />
                ),
                sortorder: route.params.sortorder || "Drop details",
              })}
            />
            <Stack.Screen
              name="StatusItem"
              component={StatusItemScreen}
              listeners={onChangeRoute}
              options={({ route, navigation }) => ({
                header: (props) => <GradientLayout onPressBack={() => navigation.goBack()} {...props} />,
                headerStyle: {
                  backgroundColor: "transparent",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                headerTitle: route.params.drop.drop_details[route.params.index].title || "Status",
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
