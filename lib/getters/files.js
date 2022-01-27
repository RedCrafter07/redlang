"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleCode_1 = __importDefault(require("../handleCode"));
const fs_1 = __importDefault(require("fs"));
function checkForFiles(directory) {
    fs_1.default.readdirSync(directory).forEach(file => {
        if (file.endsWith('.rlang')) {
            let code = fs_1.default.readFileSync(directory + '/' + file, 'utf8');
            // handling the code
            let out = (0, handleCode_1.default)(code);
            eval(out.code);
        }
    });
}
exports.default = checkForFiles;
