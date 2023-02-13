import Application from "../models/ApplicationModel.js";
import Trip from "../models/TripModel.js";


export async function getApplicationByExplorerId(req, res) {
  const { explorerId } = req.params;
  try {
    //agreegate is used to group the applications by status 
    const applications = await Application.find({ explorer_id: explorerId });
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getApplicationByTripId(req, res) {
  const { tripId } = req.params;
  try {
    const applications = await Application.find({ trip_id: tripId });
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addApplication(req, res) {
  // explorer_id is the actor_id logged into the system
  const application = await Application.findOne({
    trip_id: req.body.trip_id,
    explorer_id: req.body.explorer_id
  });
  if (application) {
    res.status(400).send({ message: "Application already exists" });
    return;
  }
  const trip = await Trip.findOne({ _id: req.body.trip_id});
  if (!trip || trip.startDate < Date.now() || trip.status === "CANCELLED") {
    res.status(400).send({ message: "Trip is not available" });
    return;
  }
  const newApplication = new Application(req.body);
  newApplication.status = "PENDING";
  newApplication.rejected = false;
  newApplication.rejectedReason = "";
  newApplication.requestedDate = new Date();
  try {
    const application = await newApplication.save();
    res.status(201).send(application);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function findById(req, res) {
  Application.findById(req.params.id, (err, application) => {
    if (err) {
      res.send(err);
    } else {
      res.send(application);
    }
  });
}

export async function updateApplicationStatus(req, res) {
  // explorer can cancel application if it is pending, due or accepted
  // manager can change de status application if it is pending to due or accepted
  const { id } = req.params;
  const { status } = req.body;
  const application = await Application.findById(id);
  if (application) {
    application.status = status;
    const updatedApplication = await application.save();
    res.send(updatedApplication);
  } else {
    res.status(404).send({ message: "Application Not Found" });
  }
}

export async function updateApplicationComment(req, res) {
  // explorer can update the comment of the application if it is pending
  const { id } = req.params;
  const { comment } = req.body;
  const application = await Application.findById(id);
  if (application && application.status === "PENDING") {
    application.comment = comment;
    const updatedApplication = await application.save();
    res.send(updatedApplication);
  } else {
    if (application.status === "PENDING") {
      res.status(400).send({ message: "Application is not pending" });
    } else {
      res.status(404).send({ message: "Application Not Found" });
    }
  }
}

export async function rejectApplication(req, res) {
  const { id } = req.params;
  const { rejectedReason } = req.body;
  const application = await Application.findById(id);
  if (application) {
    application.status = "REJECTED";
    application.rejectedReason = rejectedReason;
    const updatedApplication = await application.save();
    res.send(updatedApplication);
  } else {
    res.status(404).send({ message: "Application Not Found" });
  }
}