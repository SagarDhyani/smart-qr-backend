require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const app = express();
const port = process.env.PORT;

connectDb();

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
