
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Award = new schema(
  {
    title: {
      type: String,
      trim: true,
      max: 64,
    },

    date: {
      type: String,
      trim: true,
      max: 64,
    },
    time: {
      type: String,
      trim: true,
      max: 64,
    },
    host: {
      type: String,
      trim: true,
      max: 64,
    },
    place: {
      type: String,
      trim: true,
      max: 64,
    },

    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      max: 64,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Award", Award);
