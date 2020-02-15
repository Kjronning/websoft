"use strict";

/**
 * Return the range between a and b as a string, separated by commas.
 *
 * @param {int} a   Start value.
 * @param {int} b   Last included value.
 * @param {string}  sep Separator, defaults to ", ".
 *
 * @returns {string} A comma separated list of values.
 */

module.exports = {
    "stringRange": stringRange
};

function stringRange(a, b, sep = ", ") {
    let res = "";
    let i = a;

    while (i < b) {
        res += i + sep;
        i++;
    }

    res = res.substring(0, res.length - sep.length);
    return res;
}

//console.log(stringRange(1, 10));
//console.log(stringRange(1, 10, "-"));