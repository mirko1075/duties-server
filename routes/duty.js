const express = require("express");
const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const validations = [
  check("Id")
    .trim()
    .isLength({ min: 2, max: 4 })
    .escape()
    .withMessage("A Id is required"),
  check("Name")
    .trim()
    .isLength({ min: 8, max: 50 })
    .escape()
    .withMessage("A Id is required"),
];

module.exports = (params) => {
  const { dutyService } = params;
  // GET '/duties' Get all duties
  router.get("/", async (req, res, next) => {
    try {
      console.log("Get duties list");
      const dutiesList = await dutyService.getList();
      if (dutiesList) res.status(200).json(dutiesList);
      else res.status(204).send("No data found");
    } catch (error) {
      next(createError(error));
    }
  });

  // GET '/duties/:dutyId' Get all duties
  router.get("/:dutyId", async (req, res, next) => {
    try {
      console.log("Get duty detail");
      const dutyId = req.params.dutyId;
      const dutyFound = await dutyService.getDuty(dutyId);
      if (dutyFound) res.status(200).json(dutyFound);
      else res.status(204).send("No data found");
    } catch (error) {
      next(createError(error));
    }
  });

  // GET '/duties/:dutyId' Get all duties
  router.delete("/:dutyId", async (req, res, next) => {
    try {
      console.log("Get duty detail");
      const dutyId = req.params.dutyId;
      const dutyFound = await dutyService.deleteDuty(dutyId);
      if (dutyFound) res.status(200).json(dutyFound);
      else res.status(204).send("No data found");
    } catch (error) {
      next(createError(error));
    }
  });

  // PUT '/duties/:dutyId' Get duty by dutyId
  router.put(
    "/:dutyId",
    [
      check("Name")
        .trim()
        .isLength({ min: 8, max: 50 })
        .escape()
        .withMessage("A Id is required"),
    ],
    async (req, res, next) => {
      try {
        console.log("Put duty detail");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ errors: errors.array() });
        }
        const dutyId = req.params.dutyId;
        const { Id, Name } = req.body;
        const dutyFound = await dutyService.putDuty(dutyId, { Id, Name });
        if (dutyFound) res.status(200).json(dutyFound);
        else res.status(204).send("No data found");
      } catch (error) {
        next(createError(error));
      }
    }
  );

  // POST '/duties' Create duty
  router.post(
    "/",
    [
      check("Id")
        .trim()
        .isLength({ min: 2, max: 4 })
        .escape()
        .withMessage("A Id is required"),
      check("Name")
        .trim()
        .isLength({ min: 8, max: 50 })
        .escape()
        .withMessage("A Id is required"),
    ],
    async (req, res, next) => {
      try {
        console.log("Add duty");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(500).json({ errors: errors.array() });
        }
        const { Id, Name } = req.body;
        const dutiesList = await dutyService.addDuty(Id, Name);
        if (dutiesList) res.status(201).json(dutiesList);
        else res.status(204).send("No data found");
      } catch (error) {
        next(createError(error));
      }
    }
  );
  return router;
};
