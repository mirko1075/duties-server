const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const mongoose = require("mongoose");
const Duties = require("../models/duty.model");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Successfully connected to the mongodb database");
  })
  .catch((err) => {
    console.info("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// GET '/duties' Get all duties
router.get("/", (req, res, next) => {
  console.log("Get duties list");
  Duties.find()
    .then((dutiesList) => {
      res.status(200).json(dutiesList);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// GET '/duties/:dutyId' Get all duties
router.get("/:dutyId", (req, res, next) => {
  console.log("Get duty detail");
  const dutyId = req.params.dutyId;
  Duties.findOne({ Id: dutyId })
    .then((dutyFound) => {
      res.status(200).json(dutyFound);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// GET '/duties/:dutyId' Get all duties
router.delete("/:dutyId", (req, res, next) => {
  console.log("Get duty detail");
  const dutyId = req.params.dutyId;
  Duties.findOneAndDelete({ Id: dutyId })
    .then((dutyFound) => {
      res.status(200).json(dutyFound);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// PUT '/duties/:dutyId' Get duty by dutyId
router.put("/:dutyId", (req, res, next) => {
  console.log("Put duty detail");
  const dutyId = req.params.dutyId;
  const { Id, Name } = req.body;
  Duties.findOneAndUpdate(
    { Id: dutyId },
    { Id, Name },
    {
      returnDocument: "after",
    }
  )
    .then((dutyFound) => {
      res.status(200).json(dutyFound);
    })
    .catch((err) => {
      next(createError(err));
    });
});

// POST '/duties' Create duty
router.post("/", (req, res, next) => {
  console.log("Add duty");
  const { Id, Name } = req.body;
  Duties.create({
    Id,
    Name,
  })
    .then((dutiesList) => {
      res.status(200).json(dutiesList);
    })
    .catch((err) => {
      next(createError(err));
    });
});

module.exports = router;
