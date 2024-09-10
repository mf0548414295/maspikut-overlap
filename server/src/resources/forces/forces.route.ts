import express from "express";
import { getForces } from "./forces.controller";

export const forcesRouter = express.Router();

forcesRouter
  .get("/:type", getForces);
