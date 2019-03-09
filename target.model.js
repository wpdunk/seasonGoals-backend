const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Target = new Schema({
  target_description: {
    type: String
  },
  target_priority: {
    type: String
  },
  target_completed: {
    type: Boolean
  }
});
module.exports = mongoose.model("Target", Target);
