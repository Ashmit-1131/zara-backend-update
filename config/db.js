const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const connection = mongoose.connect(process.env.mongo_Url);

module.exports = {
  connection,
};