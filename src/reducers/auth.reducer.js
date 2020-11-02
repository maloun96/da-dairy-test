const INITIAL_STATE = {
  user: null,
  error: null,
  remember: true,
  hasLock: false,
  loginAttempts: 0,
  startLockDown: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        error: null,
        loginAttempts: 0,
        startLockDown: null,
      };

    case "SET_AUTH_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_LOCK":
      return {
        ...state,
        hasLock: action.payload,
      };

    case "SET_REMEMBER":
      return {
        ...state,
        remember: action.payload,
      };

    case "INCREASE_LOGIN_ATTEMPTS": {
      const attempts = state.loginAttempts + 1;

      return {
        ...state,
        loginAttempts: state.loginAttempts + 1,
        startLockDown: attempts + 1 >= 10 ? Date.now() : null,
      };
    }

    case "RESET_LOGIN_ATTEMPTS":
      return {
        ...state,
        startLockDown: null,
        loginAttempts: 0,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        error: null,
        token: null,
        startLockDown: null,
        loginAttempts: 0,
      };

    default:
      return state;
  }
};
