// fetchServer.js file
var args = process.argv.slice(2);
const http = require("http");
const fetch = require("node-fetch");
var port = 8686;

http
  .createServer(async function (req, res) {
    console.log(args);
    if (args[1] === "text") {
      res.writeHead(200, { "Content-Type": "text/http" });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
    }
    var url = args[0] ? args[0] : "https://www.google.com";
    var fetchResponse = await fetch(url);
    if (fetchResponse.ok) {
      var html = await fetchResponse.text();
      res.write(html);
    } else {
      res.write(fetchResponse.statusText);
      res.write(fetchResponse.status);
    }
    res.end();
  })
  .listen(port);
