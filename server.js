const express = require("express");
const app = express();
var cors = require("cors");
const resource = require("./resource.json");
const router = require("./routes");

const port = 3000;

app.use(cors());
app.use("/life", router);

app.get("/", (req, res) => {
  res.send(resource);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(resource);
});
