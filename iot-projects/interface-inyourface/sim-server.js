// A server that simulates a device that is taking regular temperature readings.

// Load the http module to create an http server.
const http = require("http");
const WebSocket = require("ws");
const port = 8080;

//TODO 1: Variables and generateTemperature function
var temperature = 72;
var nextChange = 0;

function generateTemperature() {
  let changeRate = Math.ceil(Math.random() * 5);
  let changeDifference = Math.random() * changeRate - changeRate * 0.5;
  nextChange += changeDifference;
  temperature += nextChange;

  if (temperature < 0) {
    temperature = 0;
    nextChange = 0;
  } else if (temperature > 100) {
    temperature = 100;
    nextChange = 0;
  }
}

setInterval(generateTemperature, 1000);

// Configure our HTTP server.
const server = http.createServer(function (req, res) {
  /* DO NOT EDIT THIS CODE */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  /* DO NOT EDIT THIS CODE */

  //TODO 2: Regular Polling Server
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ value: temperature }));
  }
});

//TODO 7: WebSocket Server
const wss = new WebSocket.Server({ server });
wss.on("connection", function (socket) {
  setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ value: temperature }));
    }
  }, 1000);
});

/* DO NOT EDIT THIS CODE */
server.listen(port);
