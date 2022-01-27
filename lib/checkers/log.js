"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functionParameters_1 = __importDefault(require("../getters/functionParameters"));
function checkForLog(lines) {
    lines.forEach((line, index) => {
        if (!line.startsWith('#')) {
            if (line.startsWith('out')) {
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
        }
    });
    return lines;
}
exports.default = checkForLog;
