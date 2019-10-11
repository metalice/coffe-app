import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";

import Login from "components/login/Login";
import Main from "components/main/Main";
import actions from "store/actions/index";

import "./App.css";

const App = () => {
  const {
    user: { isLogged, isToken, user }
  } = useSelector(state => {
    console.log("state: ", state);
    return state;
  });
  console.log('isToken: ', isToken);
  const [loading, setLoading] = useState(true);
  console.log("loading: ", loading);

  const dispatch = useDispatch();
  useEffect(() => {
    const { CONNECT_TO_SOCKET } = actions.user;
    !isLogged && isToken && dispatch(CONNECT_TO_SOCKET());
    !isToken && setLoading(false);
  }, [isToken, isLogged, dispatch]);

  useEffect(() => {
    user && setLoading(false);
  }, [user]);

  return (
    <div className="App">
      <Spin tip="Loading..." spinning={loading} delay={500}>
        {!loading && (isLogged ? <Main /> : <Login />)}
      </Spin>
    </div>
  );
};

export default App;
