const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const cors = require("cors");

// import routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/posts.router");

env.config();
//Midellware

//DB connect
const { DB_URL } = require("./helpers/keys");
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("Error", (err) => {
  console.log("faild to Connect with MongoDB", err);
});

//Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.listen(process.env.API_PORT, () => {
  console.log(`Server started on ${process.env.API_PORT}`);
});
