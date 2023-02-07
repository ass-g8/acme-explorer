'use strict'
import Finder from '../models/finderModel.js'

export async function getFinder(req, res) {
    try {
        const finders = await Finder.find({})
        res.send(finders)
    }
    catch (err) {
        res.send(err)
    }
}

export async function addFinder(req, res) {
    console.log(req.body)
    const newFinder = new Finder(req.body)
    try {
        const finder = await newFinder.save()
        res.send(finder)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).send(err)
        } else {
            res.status(500).send(err)
        }
    }
}

