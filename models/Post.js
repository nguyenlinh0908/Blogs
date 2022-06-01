const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Provide title"],
  },
  description: {
    type: String,
    required: [true, "Provide description"],
  },
  url: {
    type: String,
    required: [true, "Provide url"],
  },
  content: {
    type: String,
    required: [true, "Provide content"],
  },
  category: {
    type: String,
    required: [true, "Provide category"],
  },
  by: {
    type: String,
    required: [true, "Provide created by"],
  },
  createdAt: {
    type: String,
    required: [true, "Provide createdAt"],
  },
  views: {
    type: String,
    default: 0,
  },
});
module.exports = mongoose.model("Post", postSchema);
