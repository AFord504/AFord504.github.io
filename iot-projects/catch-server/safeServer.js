const http = require("http");
const port = 3000;

var serverStatus = undefined;

const server = http
  .createServer(function (req, res) {
    try {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(serverStatus);
      } else if (req.method === "PUT") {
        body = "";
        req.on("data", function (data) {
          body += data;
        });
        req.on("end", function () {
          parsedBody = JSON.parse(body);
          serverStatus = parsedBody.message;
        });
      }
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("The server has no data.");
    } finally {
      if (serverStatus) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("The server has been updated.");
      }
      res.write("-and the message arrived");
      res.end();
    }
  })
  .listen(port);

console.log("listening on port " + port);
console.log(`http://localhost:${port}`);
