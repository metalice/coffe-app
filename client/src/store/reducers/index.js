import { combineReducers } from "redux";
import user from "./userReducer";
import socket from "./socketReducer"

export default combineReducers({ user, socket });
