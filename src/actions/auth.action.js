import api, { BASE_URL, DEV_APP_KEY } from "utils/api";
import preferencesActions from "actions/preferences.action";
import { MESSAGE_SERVER_DOWN } from "constants/index";
import axios from "axios";
import { AsyncStorage } from "react-native";

const authActions = {
  login: (username, password, rememberMe) => async (dispatch) => {
    const formData = new FormData();
    formData.append("user_name", username);
    formData.append("password", password);
    formData.append("devappkey", DEV_APP_KEY);

    try {
      const { data } = await axios.post(`${BASE_URL}/login_as`, formData, {
        withCredentials: false,
        headers: {
          Cookie: "",
        },
      });

      if (data.success === "OK" && data.data) {
        dispatch(authActions.setUser(data.data));
        dispatch(authActions.setRemember(rememberMe));
        dispatch(preferencesActions.selectRound(null));
        await AsyncStorage.setItem("sessionid", data.data.sessionid);
        authActions.getHasLockPermission(dispatch);
      } else {
        dispatch(authActions.setAuthError(data.message));
        if (username !== "" && password !== "") dispatch(authActions.addLoginAttempt());
      }
    } catch (e) {
      if (e.response.status === 503) {
        dispatch(authActions.setAuthError(MESSAGE_SERVER_DOWN));
      }
    }
  },

  getHasLockPermission: async (dispatch) => {
    const { data } = await api.get(`/has_lock_permission`);
    const can_lock = data.data.can_lock;

    dispatch(authActions.setLock(can_lock));
  },

  setUser: (user) => ({
    type: "SET_USER",
    payload: user,
  }),

  setLock: (value) => ({
    type: "SET_LOCK",
    payload: value,
  }),

  clearAll: () => ({
    type: "CLEAR_ALL",
  }),

  setRemember: (remember) => ({
    type: "SET_REMEMBER",
    payload: remember,
  }),

  setAuthError: (message) => ({
    type: "SET_AUTH_ERROR",
    payload: message,
  }),

  logout: () => ({
    type: "LOGOUT",
  }),

  addLoginAttempt: () => ({
    type: "INCREASE_LOGIN_ATTEMPTS",
  }),

  resetLoginAttempt: () => ({
    type: "RESET_LOGIN_ATTEMPTS",
  }),
};

export default authActions;
