"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const app = express();
const path = require("path");
const lotto_json_generator = require("./lotto/javascript/lotto_json.js");

app.set("view engine", "ejs");
app.use( (req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

app.use(express.static(path.join(__dirname, "report")));
app.use(express.static(path.join(__dirname, "lotto")));

app.get("/lotto-json", (req, res) => {
    let winnerArray = lotto_json_generator.generate_JSON(7,1,35);
    let query = (req.query.row).split(",");
    let response = "";
    let correct_guesses = [];
    if(query.length !== 7){
        response = "query must be seven numbers!";
    }else{
        query.forEach(number => {
            winnerArray.forEach(winner => {
                if(number == winner)
                    correct_guesses.push(number);
            })
        });
        response = `${correct_guesses.length} correct guesses. <br>
        Your numbers: ${query.toString()} <br>
        Winning numbers: ${winnerArray}`
    }
    res.send(response);
});

app.listen(port, () => {
    console.info(`Server is listening on port ${port}.`);

    // Show which routes are supported
    console.info("Available routes are:");
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.info(r.route.path);
        }
    });
});