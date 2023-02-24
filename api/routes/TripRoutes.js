"use-strict";
import {
  findTrips,
  findById,
  updateTrip,
  deleteTrip,
  addTrip,
  findTripsByManagerId,
  publishTrip,
  cancelTrip,
  findSponsorshipsBySponsorId,
  getTripSponsorshipById,
  addSponsorship,
  updateTripSponsorship,
  updateTripSponsorshipStatus,
  paySponsorship
} from "../controllers/TripController.js";
import { filterValidator } from "../controllers/validators/FinderValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { addFinder } from "../controllers/FinderController.js";
import { creationValidator } from "../controllers/validators/TripValidator.js";
import { getLastFinder } from "../middlewares/FinderMiddleware.js";

export default function (app) {
  app.route("/api/v1/trips")
    .get(
      filterValidator,
      handleExpressValidation,
      getLastFinder,
      addFinder,
      findTrips
    )
    .post(
      creationValidator,
      handleExpressValidation,
      addTrip);

  app.route("/api/v1/trips/:id")
    .get(findById)
    .put(updateTrip)
    .delete(deleteTrip);

  app.route("/api/v1/trips/manager/:managerId")
    .get(findTripsByManagerId);

  app.route("/api/v1/trips/:id/publish")
    .patch(publishTrip);

  app.route("/api/v1/trips/:id/cancel")
    .patch(cancelTrip);

  app.route("/api/v1/trips/:id/sponsorships")
    .put(addSponsorship);

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId")
    .put(updateTripSponsorship);

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId/change-status")
    .patch(updateTripSponsorshipStatus);

  app.route("/api/v1/trips/sponsorships/:id")
    .get(getTripSponsorshipById);

  app.route("/api/v1/trips/sponsorships/sponsor/:id")
    .get(findSponsorshipsBySponsorId);

  app.route("/api/v1/trips/sponsorships/:id/pay")
    .post(paySponsorship);
}
