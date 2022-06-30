const express = require("express");
const router = express.Router();
const Duties = require("../models/duty.model");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
