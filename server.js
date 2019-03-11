const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const targetRoutes = express.Router();
// const PORT = 4000;

const passport = require("passport");
const users = require("./routes/api/users");
const targets = require("./routes/api/targets");

let Target = require("./models/target.model");

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
// app.use("/targets", targetRoutes);
app.use("/api/targets", targets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// app.listen(PORT, function() {
//   console.log("Server is running on Port: " + PORT);
// });
