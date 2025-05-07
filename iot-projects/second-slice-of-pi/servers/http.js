var converter = require("./../middleware/converter");
var bodyParser = require("body-parser");
var sensorRoutes = require("./../routes/sensors");
var actuatorRoutes = require("./../routes/actuators");
const express = require("express");
var app = express();
cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.use("/pi/sensors", sensorRoutes);
app.use("/pi/actuators", actuatorRoutes);

app.get("/", function (req, res) {
  res.send("Root accessed");
});

app.get("/pi", function (req, res) {
  res.send("Gateway accessed");
});

app.use(converter());

module.exports = app;
// I have looked through all files
