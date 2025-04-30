var sensorRoutes = require("./../routes/sensors");
const express = require("express");
var app = express();
cors = require("cors");
app.use(cors());
app.use("/pi/sensors", sensorRoutes);

app.get("/", function (req, res) {
  res.send("Root accessed");
});

app.get("/pi", function (req, res) {
  res.send("Gateway accessed");
});

module.exports = app;
// I have looked through all files
