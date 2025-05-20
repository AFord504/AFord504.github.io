const http = require("http");
const port = 3000;

var data = "";
var secret = "I like math";
var notSecret = "I like games";
var list = [];

http
  .createServer(function (req, res) {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      if (req.url === "/secret") {
        res.end(secret);
      } else {
        res.end(notSecret);
      }
    } else if (req.method === "DELETE") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      secret = null;
      res.end("Secret deleted.");
    } else if (req.method === "PUT") {
      req.on("data", function (chunk) {
        console.log(chunk.toString());
        data += chunk.toString();
      });
      req.on("end", function () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      });
    } else if (req.method === "POST") {
      req.on("data", function (chunk) {
        const incomingData = chunk.toString();
        list.push(incomingData);
      });
      req.on("end", function () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data added successfully");
      });
    }
  })
  .listen(port);

console.log("listening on port " + port);
console.log(`http://localhost:${port}`);
