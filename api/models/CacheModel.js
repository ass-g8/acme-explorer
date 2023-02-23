"use strict";
import mongoose from "mongoose";
import { schema as tripSchema } from "./TripModel.js";

const cacheSchema = new mongoose.Schema(
  {
    explorer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: "Cache explorer required",
    },
    results: [tripSchema]
  },
  { strinct: false, timestamps: true }
);

const model = mongoose.model("Cache", cacheSchema);

export const schema = model.schema;
export default model;
