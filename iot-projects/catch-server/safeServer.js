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
          serverStatus = parsedBody.status;
        });
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("The server has been updated.");
      }
    } catch {
      res.write("The server has no data.");
    } finally {
      res.write("-and the message arrived");
      res.end();
    }
  })
  .listen(port);

console.log("listening on port " + port);
console.log(`http://localhost:${port}`);
