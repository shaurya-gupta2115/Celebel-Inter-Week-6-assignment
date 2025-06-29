const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const main = require("./config/db");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cookieParser()); // ✅ REQUIRED to parse cookies
app.use(cors({ origin: true, credentials: true }));

// Middleware
app.use(express.json());
app.use("/user",userRouter)

const InitalizeConnection = async () => {
  try {
   main(); 
    console.log("DB Connected");

    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      console.log("Server listening at port number: " + PORT);
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};
InitalizeConnection();
