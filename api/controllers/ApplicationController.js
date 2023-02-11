import Application from "../models/ApplicationModel.js";

export async function findById(req, res) {
  Application.findById(req.params._id, (err, application) => {
    if (err) {
      res.send(err);
    } else {
      res.send(application);
    }
  });
}

export async function updateApplication(req, res) {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );

    if (application) {
      res.send(application);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteApplication(req, res) {
  try {
    const deletionResponse = await Application.deleteOne({
      _id: req.params._id,
    });

    if (deletionResponse.deletedCount > 0) {
      res.json({ message: "Application deleted successfully" });
    } else {
      res.status(404).res("Application could not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getApplication(req, res) {
  try {
    const applications = await Application.find();
    res.send(applications);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addApplication(req, res) {
  const newApplication = new Application(req.body);
  try {
    const application = await newApplication.save();
    res.send(application);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateApplicationStatus(req, res) {
  const { _id } = req.params;
  const { status } = req.body;
  const application = await Application.findById(_id);
  if (application) {
    application.status = status;
    const updatedApplication = await application.save();
    res.send(updatedApplication);
  } else {
    res.status(404).send({ message: "Application Not Found" });
  }
}
