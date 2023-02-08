"use-strict";
import {
  getActor,
  findBy_id,
  updateActor,
  deleteActor,
  addActor,
} from "../controllers/ActorController.js";

export default function (app) {
  app.route("/api/v1/actors");
  app.route("/api/v1/actors");
}
