"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./checkers/log"));
const variables_1 = __importDefault(require("./checkers/variables"));
const statements_1 = __importDefault(require("./checkers/statements"));
function handleCode(code) {
    code = code.replace(/\r\n/g, '\n');
    code = (0, variables_1.default)(code);
    // console.log(code);
    code = (0, log_1.default)(code);
    // console.log(code);
    code = (0, statements_1.default)(code);
    return code;
}
exports.default = handleCode;
