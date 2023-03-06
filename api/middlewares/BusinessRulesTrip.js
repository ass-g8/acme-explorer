import Trip from "../models/TripModel.js";
import Application from "../models/ApplicationModel.js";

export const checkTripPublished = async (req, res, next) => {
    const trip = await Trip.findById(req.params.id);
    if (trip.status === "PUBLISHED") {
        res.status(400).send({
            message: res.__("PUBLISHED_TRIP")
        });
    } else {
        next();
    }
};

export const checkCancelableTrip = async (req, res, next) => {
    const trip = await Trip.findById(req.params.id);
    if (trip.status !== "PUBLISHED") {
        res.status(400).send({
            message: res.__("UNPUBLISHED_TRIP")
        });
    } else if (trip.startDate <= new Date.now()) {
        res.status(400).send({
            message: res.__("TRIP_STARTED")
        });
    }
    const applications = await Application.find({ trip_id: req.params.id, status: "ACCEPTED" });
    if (applications.length > 0) {
        res.status(400).send({
            message: res.__("APPLICATIONS_ACCEPTED")
        });
    } else {
        next();
    }
};