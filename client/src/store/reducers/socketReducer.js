import types from "utils/types";
import initialState from "../initial-state";

const { DISCONNECT } = types.socket;

export default (state = initialState.socket, { type, payload }) => {
  switch (type) {
    case DISCONNECT: {
      state.socket.emit(DISCONNECT);
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
