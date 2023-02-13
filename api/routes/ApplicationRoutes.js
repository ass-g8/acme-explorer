"use-strict";
import {
  getApplication,
  findById,
  addApplication,
  updateApplicationStatus,
  updateApplicationComment,
  rejectApplication
} from "../controllers/ApplicationController.js";
// import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/applications")
    .get(getApplication)
    .post(addApplication);

  app.route("/api/v1/applications/:id")
    .get(findById)

  app.route("/api/v1/applications/:id/change-status")
    .patch(updateApplicationStatus);

  app.route("/api/v1/applications/:id/change-comment")
    .patch(updateApplicationComment);

  app.route("/api/v1/applications/:id/reject")
    .patch(rejectApplication);
}
