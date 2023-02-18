"use-strict";
import {
  getTrip,
  findById,
  updateTrip,
  deleteTrip,
  addTrip,
} from "../controllers/TripController.js";
import { filterValidator } from "../controllers/validators/FinderValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { addFinder } from "../controllers/FinderController.js";

export default function (app) {
  app.route("/api/v1/trips")
    .get(
      filterValidator,
      handleExpressValidation,
      addFinder,
      getTrip
    )
    .post(addTrip);

  app.route("/api/v1/trips/:id")
    .get(findById)
    .put(updateTrip)
    .delete(deleteTrip);
  // app.route("/api/v1/trips/:id/change-status").patch();
}
