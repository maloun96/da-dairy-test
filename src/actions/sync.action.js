const syncActions = {
  addSync: (action) => ({
    type: "ADD_SYNC",
    payload: action,
  }),

  isSync: (value) => ({
    type: "IS_SYNC",
    payload: value,
  }),

  removeSync: (action) => ({
    type: "REMOVE_SYNC",
    payload: action,
  }),
};

export default syncActions;
