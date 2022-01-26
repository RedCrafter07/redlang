"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function variableToOutput(variable) {
    const { name, constant, value } = variable;
    let pref = constant ? 'const' : 'let';
    return `${pref} ${name} = ${value};`;
}
exports.default = variableToOutput;
