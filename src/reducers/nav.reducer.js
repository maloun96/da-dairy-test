const INITIAL_STATE = {
  name: null,
  params: null,
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_NAV": {
      return {
        name: action.payload?.name,
        params: action.payload?.params || null,
      };
    }

    case "LOGOUT": {
      return {
        name: null,
        params: null,
      };
    }

    default:
      return state;
  }
};
