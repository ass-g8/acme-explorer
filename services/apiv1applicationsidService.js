import Application from "../models/applicationModel.js";

export async function findBy_id(req, res) {
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
