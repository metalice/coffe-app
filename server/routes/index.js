import express from "express";
import UserRoutes from "./UserRoutes";

const routes = express.Router();

routes.use("/api/user", UserRoutes);

export default routes;
