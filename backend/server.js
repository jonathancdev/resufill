// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profile");
const photoRoutes = require("./routes/photo");
const userRoutes = require("./routes/user");

//express app
const app = express();

//cors
const cors = require("cors");
app.use(cors());

//middleware
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ limit: "10MB" }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/profile", profileRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
