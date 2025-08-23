const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

const connectDb = async () => {
  return await mongoose.connect(mongoUri);
};

module.exports = connectDb;
