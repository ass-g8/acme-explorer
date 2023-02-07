'use strict'
import Actor from '../models/actorModel.js'

export async function getActor(req, res) {
    try {
        const actors = await Actor.find({})
        res.send(actors)
    }
    catch (err) {
        res.send(err)
    }
}

export async function addActor(req, res) {
    const newActor = new Actor(req.body)
    try {
        const actor = await newActor.save()
        res.send(actor)
    }
    catch (err) {
        res.send(err)
    }
}

