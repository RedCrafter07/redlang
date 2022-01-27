"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./checkers/log"));
const variables_1 = __importDefault(require("./checkers/variables"));
const statements_1 = __importDefault(require("./checkers/statements"));
const getSplittedLines_1 = __importDefault(require("./getters/getSplittedLines"));
const arrayToString_1 = __importDefault(require("./utils/arrayToString"));
const getCompilerConfig_1 = __importDefault(require("./getters/getCompilerConfig"));
function handleCode(code) {
    code = code.replace(/\r\n/g, '\n');
    // parse lines
    code = (0, getSplittedLines_1.default)(code);
    // get config
    let res = (0, getCompilerConfig_1.default)(code);
    let config = res.config;
    if (!config.noLines)
        config.noLines = false;
    code = res.code;
    // check variables
    code = (0, variables_1.default)(code);
    // Check out;-s
    code = (0, log_1.default)(code);
    // Check statements
    code = (0, statements_1.default)(code);
    // return everything compiled as valid js.
    code = (0, arrayToString_1.default)(code, !config.noLines);
    return code;
}
exports.default = handleCode;
