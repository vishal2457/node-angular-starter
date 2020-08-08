const config = require("config");
const mongoose = require("mongoose");
const db = config.get("mongoURI"); 
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Database connected");
  } catch (err) {
    console.log(err, "Database error");
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
