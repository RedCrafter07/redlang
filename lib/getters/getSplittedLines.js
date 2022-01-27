"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSplittedLines(input) {
    let lines = input.split('\n'); // split the code into lines
    lines = lines.map(line => line.trim());
    lines.forEach((line) => {
        if (line.startsWith('#')) {
            lines.splice(lines.indexOf(line), 1);
        }
    });
    return lines;
}
exports.default = getSplittedLines;
