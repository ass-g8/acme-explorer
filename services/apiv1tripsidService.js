import Trip from '../models/tripModel.js';

export function findBy_id(req, res) {
    Trip.findById(req.params._id, (err, order) => {
        if (err) {
            res.send(err)
        } else {
            res.json(order)
        }
    })
}

export async function updateTrip(req, res) {
    try {
        const trip = await Trip.findOneAndUpdate(
            { _id: req.params._id },
            req.body,
            { new: true }
        )
        if (trip) {
            res.json(trip)
        }
        else {
            res.status(404).send("Trip not found")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

export async function deleteTrip(req, res) {
    try {
        const deletionResponse = await Trip.deleteOne({
            _id: req.params._id
        })
        if (deletionResponse.deletedCount > 0) {
            res.json({ message: 'Trip successfully deleted' })
        }
        else {
            res.status(404).send("Trip could not be deleted")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}

