"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handledLines_1 = __importDefault(require("../getters/handledLines"));
function filterUnhandledLines(input) {
    let handledLines = (0, handledLines_1.default)();
    let lines = input.filter((line, index) => {
        if (handledLines.includes(index)) {
            return true;
        }
        else {
            return false;
        }
    });
    return lines;
}
exports.default = filterUnhandledLines;
