"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrayToString_1 = __importDefault(require("../utils/arrayToString"));
exports.default = (input) => {
    let lines = input.split('\n'); // split the code into lines
    let nextLineIsStatement = false;
    lines.forEach((line, index) => {
        //checking if line includes an statement
        if (nextLineIsStatement == true) {
            if (line.startsWith('$')) {
                lines[index] = '}';
                nextLineIsStatement = false;
            }
        }
        if (line.startsWith('?')) {
            //checking for if statement type (normal, else if, else)
            if (line.startsWith('? ')) {
                let statement = line.slice('? '.length).split(':')[0];
                lines[index] = `if (${statement}) {`;
                nextLineIsStatement = true;
            }
            else if (line.startsWith('?x')) {
                lines[index] = 'else {';
                nextLineIsStatement = true;
            }
            else if (line.startsWith('?& ')) {
                let statement = line.slice('?& '.length).split(':')[0];
                lines[index] = `else if (${statement}) {`;
                nextLineIsStatement = true;
            }
            else {
                throw new Error('Error while compiling statement: No valid statement provided!\n' + line);
            }
        }
    });
    return (0, arrayToString_1.default)(lines, true);
};
