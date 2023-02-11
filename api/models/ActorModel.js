"use strict";
import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Kindly enter the actor name",
    },
    surname: {
      type: String,
      required: "Kindly enter the actor surname",
    },
    email: {
      type: String,
      required: "Kindly enter the actor email",
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      minlength: 5,
      required: "Kindly enter the actor password",
    },
    preferredLanguage: {
      type: String,
    },
    role: [
      {
        type: String,
        required: "Kindly enter the user role(s)",
        enum: ["ADMINISTRATOR", "MANAGER", "EXPLORER", "SPONSOR"],
      },
    ],
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

const model = mongoose.model("Actor", actorSchema);

export const schema = model.schema;
export default model;
