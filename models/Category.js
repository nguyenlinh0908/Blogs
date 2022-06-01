const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name of category"],
  },
});
module.exports = mongoose.model("Category", categorySchema);
