"use strict";
import mongoose from "mongoose";

const finderSchema = new mongoose.Schema({
  keyword: {
    type: String,
  },
  minPrice: {
    type: Number,
    min: 0.0
  },
  maxPrice: {
    type: Number,
    min: 0.0
  },
  minDate: {
    type: Date,
  },
  maxDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now
  },
  explorer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor",
    required: "Finder explorer required"
  },
}, { strict: false });

const model = mongoose.model("Finder", finderSchema);

export const schema = model.schema;
export default model;
