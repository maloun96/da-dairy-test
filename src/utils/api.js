import axios from "axios";
import { store } from "reducers/store";
import actions from "actions/auth.action";
import { AsyncStorage } from "react-native";

export const BASE_URL = "https://demodeliveryapp.ppruk.net";
export const DEV_APP_KEY = "eqvwMhKKDKQ5t6vVcCu8";

const instance = axios.create({
  withCredentials: false,
  baseURL: BASE_URL + "/db",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(async (config) => {
  const deliveryappsessionid = await AsyncStorage.getItem("sessionid");

  config.headers = {
    ...config.headers,
    Cookie: "pprdelsession=" + (deliveryappsessionid || ""),
  };

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err) {
      return;
    }
    console.log("err", err);
    if (err?.response?.status === 403) {
      store.dispatch(actions.clearAll());
    }
    throw err;
  }
);

export default instance;
