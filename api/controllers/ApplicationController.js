import Application from "../models/ApplicationModel.js";


export async function getApplication(req, res) {
  try {
    const applications = await Application.find();
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addApplication(req, res) {
  // explorer_id is the actor_id logged into the system
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
  const { id } = req.params;
  const { comment } = req.body;
  const application = await Application.findById(id);
  if (application) {
    application.comment = comment;
    const updatedApplication = await application.save();
    res.send(updatedApplication);
  } else {
    res.status(404).send({ message: "Application Not Found" });
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