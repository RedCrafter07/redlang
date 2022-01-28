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
const loops_1 = __importDefault(require("./checkers/loops"));
const filterUnhandledLines_1 = __importDefault(require("./utils/filterUnhandledLines"));
async function handleCode(code) {
    code = code.replace(/\r\n/g, '\n');
    // parse lines
    code = await (0, getSplittedLines_1.default)(code);
    // get config
    let res = await (0, getCompilerConfig_1.default)(code);
    let config = res.config;
    if (!config.noLines)
        config.noLines = false;
    code = res.code;
    // check variables
    code = await (0, variables_1.default)(code);
    // Check out;-s
    code = await (0, log_1.default)(code);
    // Check statements
    code = await (0, statements_1.default)(code);
    // Check loops
    code = await (0, loops_1.default)(code);
    // filter unhandled lines
    code = await (0, filterUnhandledLines_1.default)(code);
    // make string from array of lines and check for config.noLines
    code = await (0, arrayToString_1.default)(code, !config.noLines);
    return { code, config };
}
exports.default = handleCode;
