import mongoose from "mongoose";
import Trip from "../models/TripModel.js";

export async function findById(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      res.send(trip);
    } else {
      res.status(404).send({
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function updateTrip(req, res) {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id },
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
      _id: req.params.id,
    });
    if (deletionResponse.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send({
        message: "Trip not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

function _generateQuery(query) {
  const { keyword, minPrice, maxPrice, minDate, maxDate } = query;
  let finder = {};
  if(keyword) {
    finder = { $text: { $search: keyword } };
  }
  if(minPrice) {
    finder = { ...finder, price: { $gte: parseFloat(minPrice) } };
  }
  if(maxPrice) {
    finder = { ...finder, price: { $lte: parseFloat(maxPrice) } };
  }
  if(minDate) {
    finder = { ...finder, startDate: { $gte: minDate } };
  }
  if(maxDate) {
    finder = { ...finder, endDate: { $lte: maxDate } };
  }
  return finder;
}

export async function findTrips(req, res) {
  const finder = _generateQuery(req.query);
  try {
    const trips = await Trip.find(finder);
    res.send(trips);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function addTrip(req, res) {
  const newTrip = new Trip(req.body);
  try {
    const trip = await newTrip.save();
    res.send(trip);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Get all trips by manager_id
export async function findTripsByManagerId(req, res) {
  const { managerId } = req.params;
  try {
    const trips = await Trip.find({ manager_id: managerId });
    res.send(trips);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Update the status of a trip to "PUBLISHED"
export async function publishTrip(req, res) {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "PUBLISHED"
      },
      { new: true }
    );

    if (trip) {
      res.send(trip);
    } else {
      res.status(404).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Update the status of a trip to "CANCELLED"
export async function cancelTrip(req, res) {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "CANCELLED",
        cancelationReason: req.body.cancelationReason
      },
      { new: true }
    );

    if (trip) {
      res.send(trip);
    } else {
      res.status(404).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Returns all the sponsorships of the sponsor passed by parameters
export async function findSponsorshipsBySponsorId(req, res) {
  try {
    const sponsorshipList = await Trip.aggregate([
      {
        '$unwind': {
          'path': '$sponsorships'
        }
      }, {
        '$match': {
          'sponsorships.sponsor_id': new mongoose.Types.ObjectId(req.params.id)
        }
      }, {
        '$project': {
          '_id': 0,
          'sponsorship': '$sponsorships'
        }
      }
    ]);

    if (sponsorshipList.length === 0) {
      res.status(404).send({
        message: `Sponsor with id ${req.params.id} has no sponsorships`,
      });
    } else {
      let sponsorshipsqs = [];
      sponsorshipList.forEach(sponsorship => sponsorshipsqs.push(sponsorship.sponsorship))
      res.send(sponsorshipsqs)
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Return the sponsorship passed by parameters
export async function getTripSponsorshipById(req, res) {
  try {
    const sponsorship = await Trip.aggregate([
      {
        '$unwind': {
          'path': '$sponsorships'
        }
      }, {
        '$match': {
          'sponsorships._id': new mongoose.Types.ObjectId(req.params.id)
        }
      }, {
        '$project': {
          'sponsorship': '$sponsorships',
          '_id': 0
        }
      }
    ]);

    if (sponsorship[0].sponsorship) {
      res.send(sponsorship[0].sponsorship)
    } else {
      res.status(404).send({
        message: "Sponsorship not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Add a sponsorship to a trip
export async function addSponsorship(req, res) {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(req.params.id)
      },
      {
        $push: {
          "sponsorships": {
            // "banner": req.body.banner,
            "landingPage": req.body.landingPage,
            "amount": req.body.amount,
            "status": "PENDING",
            "sponsor_id": req.body.sponsor_id
          }
        }
      },
      {
        new: true
      }
    );

    if (trip) {
      res.send(trip);
    } else {
      res.status(404).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Update a sponsorship from a trip
export async function updateTripSponsorship(req, res) {
  try {
    // Get trip by id
    const trip = await Trip.findById(req.params.tripId);
    if (trip) {
      // Get sponsorship by id
      const sponsorship = trip.sponsorships.filter(sponsorship => sponsorship._id.equals(new mongoose.Types.ObjectId(req.params.sponsorshipId)))[0];
      if (sponsorship) {
        // Get index of sponsorship
        const sponsorshipIndex = trip.sponsorships.indexOf(sponsorship)
        // Update and save sponsorship
        // sponsorship.banner = req.body.banner
        sponsorship.landingPage = req.body.landingPage
        trip.sponsorships[sponsorshipIndex] = sponsorship
        trip.save()
        res.send(trip);
      } else {
        res.status(404).send({
          message: "Sponsorship not found",
        });
      }
    } else {
      res.status(404).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

// Update status from a sponsorship
export async function updateTripSponsorshipStatus(req, res) {
  try {
    // Get trip by id
    const trip = await Trip.findById(req.params.tripId);
    if (trip) {
      // Get sponsorship by id
      const sponsorship = trip.sponsorships.filter(sponsorship => sponsorship._id.equals(new mongoose.Types.ObjectId(req.params.sponsorshipId)))[0];
      if (sponsorship) {
        // Get index of sponsorship
        const sponsorshipIndex = trip.sponsorships.indexOf(sponsorship)
        // Update and save sponsorship
        sponsorship.status = req.body.status
        trip.sponsorships[sponsorshipIndex] = sponsorship
        trip.save()
        res.send(trip);
      } else {
        res.status(404).send({
          message: "Sponsorship not found",
        });
      }
    } else {
      res.status(404).send({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function paySponsorship(req, res) {
  res.status(200).send({ message: "Sponsorship paid" });
}