"use strict";
import Finder from "../models/FinderModel.js";

export async function findBy_id(req, res) {
  try {
    const finder = await Finder.findById(req.params._id);
    if (finder) {
      res.send(finder);
    } else {
      res.status(404).send("Finder not found");
    }
  } catch (err) {
    res.send(err);
  }
}

export async function updateFinder(req, res) {
  try {
    const finder = await Finder.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    if (finder) {
      res.send(finder);
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

export async function deleteFinder(req, res) {
  try {
    const deletionResponse = await Finder.deleteOne({ _id: req.params._id });
    if (deletionResponse.deletedCount > 0) {
      res.send({ message: "Finder successfully deleted" });
    } else {
      res.status(404).send("Finder could not be deleted");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getFinder(req, res) {
  try {
    const finders = await Finder.find({});
    res.send(finders);
  } catch (err) {
    res.send(err);
  }
}

export async function addFinder(req, res) {
  console.log(req.body);
  const newFinder = new Finder(req.body);
  try {
    const finder = await newFinder.save();
    res.send(finder);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}
