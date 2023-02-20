import Configuration from "../models/ConfigurationModel.js";

export async function updateConfiguration(req, res) {
  try {
    const configuration = await Configuration.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (configuration) {
      res.send(configuration);
    } else {
      res.status(404).send({
        message: "Configuration not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function getConfiguration(req, res) {
  try {
    const configurations = await Configuration.find({});
    res.send(configurations[0]);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}
