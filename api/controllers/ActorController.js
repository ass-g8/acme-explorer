"use strict";
import Actor from "../models/ActorModel.js";

export async function findBy_id(req, res) {
  try {
    const actor = await Actor.findById(req.params._id);
    if (actor) {
      res.send(actor);
    } else {
      res.status(404).send("Actor not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateActor(req, res) {
  try {
    const actor = await Actor.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (actor) {
      res.send(actor);
    } else {
      res.status(404).send("Actor not found");
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}

export async function deleteActor(req, res) {
  try {
    const deletionResponse = await Actor.deleteOne({ _id: req.params._id });
    if (deletionResponse.deletedCount > 0) {
      res.send({ message: "Actor successfully deleted" });
    } else {
      res.status(404).send("Actor could not be deleted");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getActor(req, res) {
  try {
    const actors = await Actor.find({});
    res.send(actors);
  } catch (err) {
    res.send(err);
  }
}

export async function addActor(req, res) {
  const newActor = new Actor(req.body);
  try {
    const actor = await newActor.save();
    res.send(actor);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}
