"use-strict";
import {
  getApplication,
  findBy_id,
  updateApplication,
  deleteApplication,
  addApplication,
  updateApplicationStatus,
} from "../controllers/ApplicationController.js";
//import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/applications").get(getApplication).post(addApplication);
  app
    .route("/api/v1/applications/:id")
    .get(findBy_id)
    .put(updateApplication)
    .delete(deleteApplication);
  app
    .route("/api/v1/applications/:id/change-status")
    .patch(updateApplicationStatus);
  //app.route("/api/v1/applications/:id/change-comment");
  //app.route("/api/v1/applications/:id/reject");
}
