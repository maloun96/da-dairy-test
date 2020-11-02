const INITIAL_STATE = {
  actions: [],
  isSync: false,
};

export const syncReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SYNC": {
      const a = state.actions;
      a.push(action.payload);
      return {
        ...state,
        actions: a,
      };
    }

    case "REMOVE_SYNC": {
      return {
        ...state,
        actions: state.actions.filter((a) => a !== action.payload),
      };
    }

    case "IS_SYNC": {
      return {
        ...state,
        isSync: action.payload,
      };
    }

    default:
      return state;
  }
};
