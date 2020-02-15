"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use( (req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

app.use(express.static(path.join(__dirname, "report")));
app.listen(port);