"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getVariableFromString(input) {
    let variable = input.split('§')[1];
    let constant = variable.includes('?');
    let name = variable.split(':')[0].trim();
    constant ? (name = name.split('?')[0]) : name;
    let value = variable.split(':')[1].trim();
    return {
        name: name,
        constant: constant,
        value: value
    };
}
exports.default = getVariableFromString;
