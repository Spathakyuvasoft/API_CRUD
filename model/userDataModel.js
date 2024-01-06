const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  name: {
    type: String,
    minLength: 4,
    require,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    require: true,
  },
  personId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("UserData", userDataSchema);
