import Trip from '../models/tripModel.js';

export async function getTrip(req, res) {
    try {
        const trips = await Trip.find({})
        res.send(trips)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

export async function addTrip(req, res) {
    const newTrip = new Trip(req.body)
    try {
        const trip = await newTrip.save()
        res.send(trip)
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}