const http = require("http");
const port = 3000;

var serverStatus = undefined;
var body = "";

const server = http
  .createServer(function (req, res) {
    try {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(serverStatus);
      } else if (req.method === "PUT") {
        req.on("data", function (data) {
          body += data.toString();
        });
        req.on("end", function () {
          serverStatus = {};
          serverStatus.status = JSON.parse(body);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("The server has been updated.");
        });
      }
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("The server has no data.");
    } finally {
      res.write("-and the message arrived");
      res.end(body);
    }
  })
  .listen(port);

console.log("listening on port " + port);
console.log(`http://localhost:${port}`);
