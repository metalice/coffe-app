import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import initialState from "./initial-state";

export default createStore(reducers, initialState, applyMiddleware(thunk));
