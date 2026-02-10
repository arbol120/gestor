const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("../config/db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", require("../routes/auth.routes"));
app.use("/api/products", require("../routes/product.routes"));

module.exports = app;
