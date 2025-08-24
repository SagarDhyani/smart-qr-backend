require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const qrCodeRoutes = require("./routes/qrCodeRoutes")
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/qr-code", qrCodeRoutes)

connectDb();

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
