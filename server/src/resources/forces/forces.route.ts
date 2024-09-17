import express from "express";
import { createForce, deleteForce, getForces } from "./forces.controller";

export const forcesRouter = express.Router();

forcesRouter
  .get("/:type", getForces)
  .post("/",createForce)
  .delete("/:id",deleteForce);
