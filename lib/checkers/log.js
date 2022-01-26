"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrayToString_1 = __importDefault(require("../utils/arrayToString"));
const functionParameters_1 = __importDefault(require("../getters/functionParameters"));
function checkForLog(input) {
    let lines = input.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('out')) {
            let arr = (0, functionParameters_1.default)(line, 'out');
            if (arr.length > 1) {
                throw new Error('out function can only have one parameter');
            }
            else if (arr.length == 1) {
                lines[index] = `console.log(${arr[0]});`;
            }
            else {
                lines[index] = `console.log();`;
            }
        }
    });
    return (0, arrayToString_1.default)(lines, true);
}
exports.default = checkForLog;
