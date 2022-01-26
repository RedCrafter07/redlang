"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayToString(input, useMultipleLines) {
    let output = '';
    input.forEach(el => {
        output += el;
        if (useMultipleLines)
            output += '\n';
    });
    return output;
}
exports.default = arrayToString;
