const mongoose = require("mongoose");

const schema = mongoose.Schema;

const videoArticle = new schema(
  {
    videolink: {
      type: String,
      required:false
    },

  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("videoArticle", videoArticle);