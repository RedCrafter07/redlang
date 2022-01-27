"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrayToString_1 = __importDefault(require("../utils/arrayToString"));
function getCompilerConfig(lines) {
    lines = lines.map(line => line.trim());
    let searchForCompiler = false;
    let firstLine = lines[0];
    if (firstLine == '%comp%') {
        searchForCompiler = true;
    }
    let compilerOptions = getLines(lines, getAllIndexes(lines, '%comp%')[0] + 1, getAllIndexes(lines, '%comp%')[1] - 1);
    compilerOptions = compilerOptions.map(opt => {
        let splitted = opt.split(':');
        let name = splitted[0].trim();
        let val = splitted[1].trim();
        return `"${name}": ${val}`;
    });
    let compilerString = (0, arrayToString_1.default)(compilerOptions, false);
    let compilerData = JSON.parse(`{${compilerString}}`);
    //remove compiler options
    lines.splice(getAllIndexes(lines, '%comp%')[0], getDifference(getAllIndexes(lines, '%comp%')[0], getAllIndexes(lines, '%comp%')[1]) + 1);
    return { config: compilerData, code: lines };
}
exports.default = getCompilerConfig;
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}
function getLines(arr, startIndex, endIndex) {
    let lines = [];
    for (let i = startIndex; i <= endIndex; i++) {
        lines.push(arr[i]);
    }
    return lines;
}
function getDifference(a, b) {
    return Math.abs(a - b);
}
