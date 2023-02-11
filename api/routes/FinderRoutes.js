"use-strict";
import {
  getFinder,
  findById,
  addFinder,
} from "../controllers/FinderController.js";
// import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/finders")
    .get(getFinder)
    .post(addFinder);

  app.route("/api/v1/finders/:id")
    .get(findById);
}
