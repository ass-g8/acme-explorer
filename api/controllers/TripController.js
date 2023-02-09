import Trip from "../models/TripModel.js";

export function findBy_id(req, res) {
  Trip.findById(req.params._id, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      res.send(order);
    }
  });
}

export async function updateTrip(req, res) {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (trip) {
      res.send(trip);
    } else {
      res.status(404).send("Trip not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteTrip(req, res) {
  try {
    const deletionResponse = await Trip.deleteOne({
      _id: req.params._id,
    });
    if (deletionResponse.deletedCount > 0) {
      res.json({ message: "Trip successfully deleted" });
    } else {
      res.status(404).send("Trip could not be deleted");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getTrip(req, res) {
  try {
    const trips = await Trip.find({});
    res.send(trips);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addTrip(req, res) {
  const newTrip = new Trip(req.body);
  try {
    const trip = await newTrip.save();
    res.send(trip);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
