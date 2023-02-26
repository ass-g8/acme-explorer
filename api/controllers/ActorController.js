"use strict";
import Actor from "../models/ActorModel.js";

export async function findById(req, res) {
  try {
    const actor = await Actor.findById(req.params.id, { password: 0 });
    if (actor) {
      res.send(actor);
    } else {
      res.status(404).send({
        message: res.__("NOT_FOUND")
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function updateActor(req, res) {
  try {
    const actor = await Actor.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (actor) {
      res.set("Resource-Path", `/api/v1/actors/${req.params.id}`);
      res.sendStatus(204);
    } else {
      res.status(404).send({
        message: "Actor not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function deleteActor(req, res) {
  try {
    const deletionResponse = await Actor.deleteOne({ _id: req.params.id });
    if (deletionResponse.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send({
        message: "Actor not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function getActors(req, res) {
  try {
    const actors = await Actor.find({}, { password: 0 });
    res.send(actors);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function addActor(req, res) {
  const newActor = new Actor(req.body);
  newActor.preferredLanguage = "es";
  try {
    const actor = await newActor.save();
    res.send(actor);
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function loginActor(req, res) {
  const actorCredentials = req.body;
  try {
    const actor = await Actor.findOne({ email: actorCredentials.email });
    actor.verifyPassword(actorCredentials.password, (_err, isMatch) => {
      if (!isMatch) {
        res.status(401).send({ message: "Failed login has happened" });
      } else {
        res.sendStatus(204);
      }
    });
  } catch (err) {
    res.status(401).send({ message: "Failed login has happened" });
  }
}

export async function banActor(req, res) {
  try {
    const actor = await Actor.findOneAndUpdate(
      { _id: req.params.id },
      { banned: req.body.banned },
      { new: true }
    );

    if (actor) {
      res.sendStatus(204);
    } else {
      res.status(404).send({
        message: "Actor not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}

export async function updateActorPassword(req, res) {
  try {
    const actor = await Actor.findOneAndUpdate(
      { _id: req.params.id },
      { password: req.body.password },
      { new: true }
    );

    if (actor) {
      res.sendStatus(204);
    } else {
      res.status(404).send({
        message: "Actor not found"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}
