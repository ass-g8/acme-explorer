"use-strict";
import {
  getActor,
  findBy_id,
  updateActor,
  deleteActor,
  addActor,
} from "../controllers/ActorController.js";
//import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/actors").get(getActor).post(addActor);
  //app.route("/api/v1/actors/login");
  app
    .route("/api/v1/actors/:id")
    .get(findBy_id)
    .put(updateActor)
    .delete(deleteActor);
  //app.route("/api/v1/actors/:id/ban");
  //app.route("/api/v1/actors/:id/update-password");
}
