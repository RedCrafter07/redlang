"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHandledLine = void 0;
let handledLines = [];
function getHandledLines() {
    return handledLines;
}
exports.default = getHandledLines;
function addHandledLine(lineIndex) {
    if (handledLines.includes(lineIndex))
        return;
    handledLines.push(lineIndex);
}
exports.addHandledLine = addHandledLine;
