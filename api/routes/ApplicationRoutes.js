"use-strict";
import {
  getApplication,
  findById,
  addApplication,
  updateApplicationStatus,
  updateApplicationComment,
  rejectApplication
} from "../controllers/ApplicationController.js";
import { creationValidator, statusValidator, commentValidator, rejectValidator } from '../controllers/validators/ApplicationValidator.js';
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js';

export default function (app) {
  app.route("/api/v1/applications")
    .get(getApplication)
    .post(
      creationValidator,
      handleExpressValidation,
      addApplication
    );

  app.route("/api/v1/applications/:id")
    .get(findById)

  app.route("/api/v1/applications/:id/change-status")
    .patch(
      statusValidator,
      handleExpressValidation,
      updateApplicationStatus
    );

  app.route("/api/v1/applications/:id/change-comment")
    .patch(
      commentValidator,
      handleExpressValidation,
      updateApplicationComment
    );

  app.route("/api/v1/applications/:id/reject")
    .patch(
      rejectValidator,
      handleExpressValidation,
      rejectApplication
    );
}
