"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handledLines_1 = require("../getters/handledLines");
exports.default = (lines) => {
    let nextLineIsStatement = false;
    lines.forEach((line, index) => {
        if (!line.startsWith('#')) {
            //checking if line includes an statement
            if (nextLineIsStatement == true) {
                if (line.startsWith('$')) {
                    lines[index] = '}';
                    (0, handledLines_1.addHandledLine)(index);
                    nextLineIsStatement = false;
                }
            }
            if (line.startsWith('?')) {
                //checking for if statement type (normal, else if, else)
                if (line.startsWith('? ')) {
                    let statement = line.slice('? '.length).split(':')[0];
                    lines[index] = `if (${statement}) {`;
                    (0, handledLines_1.addHandledLine)(index);
                    nextLineIsStatement = true;
                }
                else if (line.startsWith('?x')) {
                    lines[index] = 'else {';
                    nextLineIsStatement = true;
                    (0, handledLines_1.addHandledLine)(index);
                }
                else if (line.startsWith('?& ')) {
                    let statement = line.slice('?& '.length).split(':')[0];
                    lines[index] = `else if (${statement}) {`;
                    nextLineIsStatement = true;
                    (0, handledLines_1.addHandledLine)(index);
                }
                else {
                    throw new Error('Error while compiling statement: No valid statement provided!\n' + line);
                }
            }
        }
    });
    return lines;
};
