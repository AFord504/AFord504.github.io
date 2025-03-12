const http = require("http");
const port = Process.argv[2];

http
  .createServer((req, res) => {
    // handle response
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Testing, Testing ");
    res.end("123!");
  })
  .listen(port);
