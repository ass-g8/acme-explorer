"use-strict";
import {
  getTrip,
  findBy_id,
  updateTrip,
  deleteTrip,
  addTrip,
} from "../controllers/TripController.js";
//import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/trips").get(getTrip).post(addTrip);
  app
    .route("/api/v1/trips/:id")
    .get(findBy_id)
    .put(updateTrip)
    .delete(deleteTrip);
  //app.route("/api/v1/trips/:id/change-status").patch();
}
