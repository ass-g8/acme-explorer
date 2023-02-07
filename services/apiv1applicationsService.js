import Application from "../models/applicationModel.js";

export async function getApplication(req, res) {
  try {
    const applications = await Application.find();
    res.send(applications);
  } catch (error) {
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
