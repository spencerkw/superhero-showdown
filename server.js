"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));