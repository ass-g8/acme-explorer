"use-strict";
import {
  getApplicationsByExplorerId,
  getApplicationsByTripId,
  findById,
  addApplication,
  updateApplicationStatus,
  updateApplicationComment,
  rejectApplication,
  payApplication
} from "../controllers/ApplicationController.js";
import { creationValidator, statusValidator, commentValidator, rejectValidator } from '../controllers/validators/ApplicationValidator.js';
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js';
import { checkApplicationExists, checkInvalidTrip } from '../middlewares/BusinessRulesApplication.js';


export default function (app) {
  app.route("/api/v1/applications")
    .post(
      creationValidator,
      handleExpressValidation,
      checkApplicationExists,
      checkInvalidTrip,
      addApplication
    );

  app.route("/api/v1/applications/explorer/:explorerId")
    .get(getApplicationsByExplorerId)

  app.route("/api/v1/applications/trip/:tripId")
    .get(getApplicationsByTripId)

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

  app.route("/api/v1/applications/:id/pay")
    .post(
      payApplication
    );
}