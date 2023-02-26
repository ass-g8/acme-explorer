"use strict";
import Actor from "../models/ActorModel.js";
import admin from "firebase-admin";
import { getUserIdToken } from "../middlewares/AuthPermissions.js";

export async function findById(req, res) {
  try {
    const actor = await Actor.findById(req.params.id, { password: 0 });
    if (actor) {
      res.send(actor);
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
  let customToken;
  Actor.findOne({ email: actorCredentials.email }, function (_err, actor) {
    if (!actor || _err) {
      res.status(401).send({ message: "Failed login has happened" });
    } else {
      actor.verifyPassword(actorCredentials.password, async (_err, isMatch) => {
        if (!isMatch || _err) {
          res.status(401).send({ message: "Failed login has happened" });
        } else {
          try {
            customToken = await admin.auth().createCustomToken(actor.email);
          } catch (err) {
            console.log("Error creating custom token:", err);
            res.status(500).send({
              message: "Unexpected error, please try again in a few minutes.",
              err
            });
          }
          actor.customToken = customToken;
          res.set("custom-token", actor.customToken);
          res.sendStatus(204);
        }
      });
    }
  });
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

export async function updateVerifiedActor(req, res) {
  try {
    Actor.findById(req.params.actorId, async function (err, actor) {
      if (err) {
        res.send(err);
      } else {
        const idToken = req.headers.idtoken;
        if (actor.role.includes("ADMINISTRATOR")) {
          Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
            if (err) {
              res.send(err);
            } else {
              res.json(actor);
            }
          });
        } else if (actor.role.includes("MANAGER") || actor.role.includes("EXPLORER") || actor.role.includes("SPONSOR")) {
          const authenticatedUserId = await getUserIdToken(idToken);
          if (authenticatedUserId === req.params.actorId) {
            Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
              if (err) {
                res.send(err);
              } else {
                res.json(actor);
              }
            });
          } else {
            res.status(403).send("The Actor is trying to update an Actor that is not himself!");
          }
        } else {
          res.status(405).send("The Actor has unidentified roles");
        }
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Unexpected error",
      err
    });
  }
}
