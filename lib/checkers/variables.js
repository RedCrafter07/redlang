"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkForVariables;
const variableFromString_1 = __importDefault(require("../getters/variableFromString"));
const variableToOutput_1 = __importDefault(require("../outputs/variableToOutput"));
function checkForVariables(lines) {
    lines.forEach((line, index) => {
        if (!line.startsWith('#')) {
            if (line.includes('§')) {
                let { name, constant, value } = (0, variableFromString_1.default)(line);
                let variableString = (0, variableToOutput_1.default)({ name, constant, value });
                lines[index] = variableString;
            }
            // if (variables.includes(variable)) {
            // 	throw new Error('Variable ' + variable + ' is defined multiple times!');
            // }}
        }
    });
    return lines;
}
