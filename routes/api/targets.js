const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");

// Load Target model
const Target = require("../../models/target.model");

router.get("/", (req, res) => {
  Target.find(function(err, targets) {
    if (err) {
      console.log(err);
    } else {
      res.json(targets);
    }
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Target.findById(id, function(err, target) {
    res.json(target);
  });
});

router.post("/add", (req, res) => {
  let target = new Target(req.body);
  target
    .save()
    .then(target => {
      res.status(200).json({ target: "target added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new target failed");
    });
});

router.post("/update/:id", (req, res) => {
  Target.findById(req.params.id, function(err, target) {
    if (!target) res.status(404).send("data is not found");
    else target.target_description = req.body.target_description;
    target.target_responsible = req.body.target_responsible;
    target.target_priority = req.body.target_priority;
    target.target_completed = req.body.target_completed;
    target
      .save()
      .then(target => {
        res.json("Target updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

router.delete("/delete/:id", (req, res) => {
  Target.findOneAndDelete({ _id: req.params.id }, function(err, target) {
    if (!target) res.status(404).send("data is not found");
    else
      target
        .save()
        .then(target => {
          res.json("Target deleted :()");
        })
        .catch(err => {
          res.status(400).send("Delete not possible");
        });
  });
});

module.exports = router;
