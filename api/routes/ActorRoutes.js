"use-strict";
import {
  getActors,
  findById,
  updateActor,
  deleteActor,
  addActor,
  loginActor,
  banActor,
  updateActorPassword,
  updateVerifiedActor
} from "../controllers/ActorController.js";
import {
  actorValidator,
  passwordValidator,
  banValidator,
  passwordNotPresent
} from "../controllers/validators/ActorValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { verifyUser } from "../middlewares/AuthPermissions.js";

export default function (app) {
  app.route("/api/v1/actors")
    .get(getActors)
    .post(
      actorValidator,
      passwordValidator,
      handleExpressValidation,
      addActor
    );

  app.route("/api/v1/actors/login")
    .post(loginActor);

  app.route("/api/v1/actors/:id")
    .get(findById)
    .put(
      passwordNotPresent,
      actorValidator,
      handleExpressValidation,
      updateActor
    )
    .delete(deleteActor);

  app.route("/api/v1/actors/:id/ban")
    .patch(
      banValidator,
      handleExpressValidation,
      banActor
    );

  app.route("/api/v1/actors/:id/update-password")
    .patch(
      passwordValidator,
      handleExpressValidation,
      updateActorPassword
    );

  app.route("/api/v2/actors/:id")
    .put(
      verifyUser(["ADMINISTRATOR", "EXPLORER", "MANAGER", "SPONSOR"]),
      updateVerifiedActor
    );
}
