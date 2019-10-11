import types from "utils/types";
import axios from "axios";
import io from "socket.io-client";

const { USER_LOGGED_IN, USER_LOGGED_OUT } = types.user;
const { LOGIN_URL } = types.urls;
const socket = io(process.env.REACT_APP_MAIN_URL);

const LOGGED_IN = user => ({
  type: USER_LOGGED_IN,
  payload: { user, socket }
});

const LOGGED_OUT = () => {
  localStorage.removeItem("session-token");
  return {
    type: USER_LOGGED_OUT
  };
};

const CONNECT_TO_SOCKET = () => dispatch => {
  console.log("im hereeeeee");
  socket.emit("authenticate", {
    token: localStorage["session-token"]
  });
  socket.on("successLogin", user => {
    console.log("user: ", user);
    dispatch(LOGGED_IN(user));
  });
  socket.on("unauthorized", () => {
    console.log("this happen");
    dispatch(LOGGED_OUT());
  });
};

const LOGIN_IN_FORM = values => async dispatch => {
  try {
    const { headers } = await axios.post(LOGIN_URL, values);
    localStorage.setItem("session-token", headers["session-token"]);
    dispatch(CONNECT_TO_SOCKET());
    return {
      type: USER_LOGGED_IN
    };
  } catch ({ message }) {
    console.log(message);
  }
};

export default { LOGGED_IN, LOGGED_OUT, LOGIN_IN_FORM, CONNECT_TO_SOCKET };
