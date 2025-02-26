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
        var body = "";
        body += req.on(data);
        req.on(end);
      }
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("The server has no data.");
    } finally {
      res.write("-and the message arrived");
      res.end();
    }
  })
  .listen(port);
