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
  addStage,
  updateTripStage,
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
import { creationValidator, updateValidator, cancelValidator } from "../controllers/validators/TripValidator.js";
import { stageValidator } from "../controllers/validators/StageValidator.js";
import { creationSponsorshipValidator, updateSponsorshipValidator, changeSponsorshipStatusValidator } from "../controllers/validators/SponsorshipValidator.js";
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
    .put(
      updateValidator,
      handleExpressValidation,
      updateTrip
    )
    .delete(deleteTrip);

  app.route("/api/v1/trips/manager/:managerId")
    .get(findTripsByManagerId);

  app.route("/api/v1/trips/:id/publish")
    .patch(publishTrip);

  app.route("/api/v1/trips/:id/cancel")
    .patch(
      cancelValidator,
      handleExpressValidation,
      cancelTrip
    );

  app.route("/api/v1/trips/:id/stages")
    .put(
      stageValidator,
      handleExpressValidation,
      addStage
    );

  app.route("/api/v1/trips/:tripId/stages/:stageId")
    .put(
      stageValidator,
      handleExpressValidation,
      updateTripStage
    );

  app.route("/api/v1/trips/:id/sponsorships")
    .put(
      creationSponsorshipValidator,
      handleExpressValidation,
      addSponsorship
    );

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId")
    .put(
      updateSponsorshipValidator,
      handleExpressValidation,
      updateTripSponsorship
    );

  app.route("/api/v1/trips/:tripId/sponsorships/:sponsorshipId/change-status")
    .patch(
      changeSponsorshipStatusValidator,
      handleExpressValidation,
      updateTripSponsorshipStatus);

  app.route("/api/v1/trips/sponsorships/:id")
    .get(getTripSponsorshipById);

  app.route("/api/v1/trips/sponsorships/sponsor/:id")
    .get(findSponsorshipsBySponsorId);

  app.route("/api/v1/trips/sponsorships/:id/pay")
    .post(paySponsorship);
}
