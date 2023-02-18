"use-strict";
import {
  getTrips,
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
  updateTripSponsorshipStatus
} from "../controllers/TripController.js";
// import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/trips")
    .get(getTrips)
    .post(addTrip);

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

  app.route("/api/v1/trips/sponsorships/sponsor/:id")
    .get(findSponsorshipsBySponsorId);

  app.route("/api/v1/trips/sponsorships/:id")
    .get(getTripSponsorshipById);

  app.route("/api/v1/trips/:id/sponsorships")
    .put(addSponsorship);

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId")
    .put(updateTripSponsorship);

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId/change-status")
    .patch(updateTripSponsorshipStatus);
}
