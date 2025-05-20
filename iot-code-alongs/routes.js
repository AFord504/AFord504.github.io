const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("The answer to life is: ");
});

router.get("/secret", (req, res) => {
  res.send(42);
});

module.exports = router;
