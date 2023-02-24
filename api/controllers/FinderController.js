"use strict";

export async function addFinder(req, res, next) {
  try {
    const finder = req.newFinder;
    await finder.save();
    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}
