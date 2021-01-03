const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema(
  {

  },
  {
    timestamps : true,
  }
)

module.exports = mongoose.model("User", userModel);