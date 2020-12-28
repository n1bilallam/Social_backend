const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
//Midellware

//DB connect
const { DB_URL } = require("./helpers/keys");
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("Error", (err) => {
  console.log("faild to Connect with MongoDB", err);
});

//Routes
app.get("/", (req, res) => {
  alert("hello world");
});

app.listen(process.env.API_PORT, () => {
  console.log(`Server started on ${process.env.API_PORT}`);
});
