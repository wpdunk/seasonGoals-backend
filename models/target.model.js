const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TargetSchema = new Schema({
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
module.exports = Target = mongoose.model("Targets", TargetSchema);
