import Application from "../models/applicationModel.js";

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
