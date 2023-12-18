const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TeamMember = new schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    position: {
      type: String,
    },

    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      max: 64,
    },
    checkbox: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("TeamMember", TeamMember);
