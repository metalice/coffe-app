import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import cors from "cors";
import socketioJwt from "socketio-jwt";
import routes from "../routes";
import middleware from "../middleware";
import listeners from "../listeners";

const app = express();
const { DB_URL, DB_USER, DB_PASS, PORT, SKEY } = process.env;

app.use(
  cors({
    exposedHeaders: "session-token"
  })
);
app.use(bodyParser.json());
app.use(middleware.auth.init);

const init = async () => {
  try {
    await mongoose.connect(
      DB_URL,
      {
        user: DB_USER,
        pass: DB_PASS,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
      () => console.log(`Connected to db...`)
    );

    const server = app.listen(PORT, () => console.log(`HTTP server is running...`));

    const io = socket(server);

    io.on(
      "connection",
      socketioJwt.authorize({
        secret: SKEY,
        timeout: 15000 // 15 seconds to send the authentication message
      })
    );

    io.on("authenticated", socket => listeners.user(socket));

    app.use("/", routes);
  } catch ({ message }) {
    console.log(message);
  }
};

init();
