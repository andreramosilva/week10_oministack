const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(3333);

mongoose.connect(
  "mongodb+srv://andre:andre@cluster0-awqfp.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
