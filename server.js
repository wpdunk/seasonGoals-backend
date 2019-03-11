const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const targetRoutes = express.Router();
// const PORT = 4000;

const passport = require("passport");
const users = require("./routes/api/users");

let Target = require("./target.model");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
console.log(db);
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// LOCAL DB CONFIG
// mongoose.connect(
//   "mongodb://127.0.0.1:27017/targets",
//   { useNewUrlParser: true }
// );
// const connection = mongoose.connection;
// connection.once("open", function() {
//   console.log("MongoDB database connection established successfully");
// });

// Passport Middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

targetRoutes.route("/").get(function(req, res) {
  Target.find(function(err, targets) {
    if (err) {
      console.log(err);
    } else {
      res.json(targets);
    }
  });
});

targetRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Target.findById(id, function(err, target) {
    res.json(target);
  });
});

targetRoutes.route("/add").post(function(req, res) {
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

targetRoutes.route("/update/:id").post(function(req, res) {
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

targetRoutes.route("/delete/:id").delete(function(req, res) {
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

app.use("/targets", targetRoutes);

app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// app.listen(PORT, function() {
//   console.log("Server is running on Port: " + PORT);
// });
