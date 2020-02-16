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
    let query = req.query.row.split(",");
    let queryArray = [];
    query.forEach(number => {
       queryArray.push(parseInt(number));
    });
    console.log(winnerArray);
    console.log(queryArray);
    let response = "";
    let correct_guesses = [];
    if(queryArray.length !== 7){
        response = "query must be seven numbers!";
    }else{
        queryArray.forEach(number => {
            winnerArray.forEach(winner => {
                if(number == winner)
                    correct_guesses.push(number);
            })
        });
        response = `${correct_guesses.length} correct guesses. <br>
        Your numbers: ${createAndFillTable(queryArray)} <br>
        Winning numbers: ${createAndFillTable(winnerArray)}`
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

const createAndFillTable = function(number_array){
  let table_string = `<table style="width: 150px; height: 150px; border: black solid 1px;">`;
  let rows = 5;
  let columns = 7;
  for(let i=1;i<=rows;i++){
      table_string = (`${table_string}<tr style="text-align: center;">`);
      for(let j=1;j<=columns;j++){
          let currentNumber = columns*(i-1)+j;
          if(number_array.includes(currentNumber)){
              table_string = (`${table_string}<td style="background-color: navy; color: white;">`);
          }else{
            table_string = (`${table_string}<td>`);
          }
          table_string = (`${table_string}${currentNumber.toString()}`);
          table_string = (`${table_string}</td>`);
      }
      table_string = (`${table_string}</tr>`);
  }
    table_string = (`${table_string}</table>`);
    return table_string;
};