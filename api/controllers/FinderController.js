"use strict";
import Finder from "../models/FinderModel.js";
import mongoose from "mongoose";

export async function addFinder(req, res, next) {
  // Explorer id is the logged user
  const { keyword, minPrice, maxPrice, minDate, maxDate } = req.query;
  const explorer_id = new mongoose.Types.ObjectId("63f1171a29bb798dbb5be030");
  const newFinder = new Finder({
    keyword,
    minPrice,
    maxPrice,
    minDate,
    maxDate,
    explorer_id
  });
  try {
    await newFinder.save();
    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}