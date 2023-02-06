import Configuration from "../models/configurationModel.js";

export async function getConfiguration(req, res) {
  try {
    const configurations = await Configuration.find();
    res.send(configurations);
  } catch (error) {
    res.status(500).send(err);
  }
}

export async function addConfiguration(req, res) {
  const newConfiguration = new Configuration(req.body);
  try {
    const configuration = await newConfiguration.save();
    res.send(configuration);
  } catch (err) {
    res.status(500).send(err);
  }
}
