import express from "express";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import User from "../db/schema/UserSchema";

const routes = express.Router();
const { SKEY } = process.env;

const signToken = user => jwt.sign({ user }, SKEY);

routes.post("/create", async ({ body: { email, password, company, image } }, res) => {
  const isAlreadyExist = await User.findBy(email);
  if (isAlreadyExist) return res.status(400).send("User already exist");

  const user = new User({
    email,
    password: await argon2.hash(password, { type: argon2.argon2id }),
    company,
    image
  });

  try {
    await user.save();
    res.setHeader("session-token", signToken(user));
    return res.status(200).send();
  } catch ({ message }) {
    console.log(message);
  }
});

routes.post("/login", async (req, res) => {
  try {
    const user = await User.findBy(req.body.email);
    const validPass = await argon2.verify(user.password, req.body.password);
    if (validPass) {
      res.setHeader("session-token", signToken(user));
      return res.status(200).send("Auth success");
    }
  } catch ({ message }) {
    console.log("message: ", message);
  }
  return res.status(401).send("Unauthorized");
});

export default routes;
