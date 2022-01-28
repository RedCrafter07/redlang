"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleCode_1 = __importDefault(require("../handleCode"));
const fs_1 = __importDefault(require("fs"));
async function checkForFiles(directory) {
    fs_1.default.readdirSync(directory).forEach(async (file) => {
        if (file.endsWith('.rlang')) {
            let code = fs_1.default.readFileSync(`${directory}/${file}`, 'utf8');
            // handling the code
            let out = await (0, handleCode_1.default)(code);
            //
            let jsFile = fs_1.default.writeFileSync(`${directory}/${file}.js`, out.code, 'utf8');
        }
    });
}
exports.default = checkForFiles;
