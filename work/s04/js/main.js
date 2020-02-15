"use strict";

let utils = require("./stringRange.js");
let res;

res = utils.stringRange(1, 10);
console.info(res);

res = utils.stringRange(1, 10, "-");
console.info(res);

console.log("\nWhat does the imported 'utils' consists of?");
console.log(utils);