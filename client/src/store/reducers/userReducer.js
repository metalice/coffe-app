import types from "utils/types";
import initialState from "../initial-state";

const { USER_LOGGED_IN, USER_LOGGED_OUT } = types.user;

export default (state = initialState.user, { type, payload }) => {
  switch (type) {
    case USER_LOGGED_IN: {
      return {
        ...state,
        isLogged: true,
        isToken: true,
        user: payload.user,
        socket: payload.socket
      };
    }
    case USER_LOGGED_OUT: {
      return { isLogged: false, isToken: false };
    }
    default: {
      return state;
    }
  }
};
