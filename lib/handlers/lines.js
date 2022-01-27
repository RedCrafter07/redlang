"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFor = void 0;
exports.default = checkLines;
let checkForArr = [];
let lines = [];
function checkLines(code) {
    lines = code.split('\n');
    lines.forEach((line, index) => {
        if (!line.startsWith('#')) {
            checkForArr.forEach((check) => {
                checkMethod(line, check.searchAt, check.searchFor)
                    ? check.callback({ line, change: changeLine(index) })
                    : null;
            });
        }
    });
}
const checkFor = function (searchFor, searchAt, callback) {
    let validSearches = ['s', 'e', '*'];
    if (!validSearches.includes(searchAt))
        return;
    let data = {
        searchFor: searchFor,
        searchAt: searchAt,
        callback: callback
    };
    checkForArr.push(data);
    return data;
};
exports.checkFor = checkFor;
function checkMethod(input, method, value) {
    let validSearches = ['s', 'e', '*'];
    if (!validSearches.includes(method))
        return false;
    let check;
    method == 's'
        ? (check = input.startsWith(value))
        : method == 'e' ? (check = input.endsWith(value)) : (check = input.includes(value));
    return check;
}
function changeLine(line) {
    return function (changeTo) {
        lines[line] = changeTo;
    };
}
