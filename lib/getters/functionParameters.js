"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFunctionParameters(funcLine, funcName) {
    let params = [];
    if (!funcLine.includes(funcName))
        return params;
    let paramString = funcLine.slice(funcName.length).split(';')[1].trim();
    params = paramString.split(',,').map(param => param.trim());
    return params;
}
exports.default = getFunctionParameters;
