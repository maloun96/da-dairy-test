import { combineReducers } from "redux";
import { authReducer, preferencesReducer, syncReducer, navReducer } from "./index";

const appReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  sync: syncReducer,
  nav: navReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_ALL") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
