import Configuration from "../models/ConfigurationModel.js";

export async function findById(req, res) {
  Configuration.findById(req.params._id, (err, configuration) => {
    if (err) {
      res.send(err);
    } else {
      res.send(configuration);
    }
  });
}

export async function updateConfiguration(req, res) {
  try {
    const configuration = await Configuration.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );

    if (configuration) {
      res.send(configuration);
    } else {
      res.status(404).send("Configuration not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteConfiguration(req, res) {
  try {
    const deletionResponse = await Configuration.deleteOne({
      _id: req.params._id,
    });

    if (deletionResponse.deletedCount > 0) {
      res.json({ message: "Configuration deleted successfully" });
    } else {
      res.status(404).res("Configuration could not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getConfiguration(req, res) {
  try {
    const configurations = await Configuration.find();
    res.send(configurations);
  } catch (err) {
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
