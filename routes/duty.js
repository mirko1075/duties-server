const express = require("express");
const createError = require("http-errors");
const router = express.Router();

module.exports = (params) => {
  const { dutyService } = params;
  // GET '/duties' Get all duties
  router.get("/", (req, res, next) => {
    console.log("Get duties list");
    dutyService
      .getList()
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
    dutyService
      .getDuty(dutyId)
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
    dutyService
      .deleteDuty(dutyId)
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
    dutyService
      .putDuty(dutyId, { Id, Name })
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
  return router;
};
