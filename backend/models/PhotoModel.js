const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  user_photo: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  temporary: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Photo", photoSchema);
