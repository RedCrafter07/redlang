import checkForLog from './checkers/log';
import checkForVariables from './checkers/variables';
import checkForStatements from './checkers/statements';
import getSplittedLines from './getters/getSplittedLines';
import arrayToString from './utils/arrayToString';
import getCompilerConfig from './getters/getCompilerConfig';
import checkForLoops from './checkers/loops';

function handleCode(code: any) {
	code = code.replace(/\r\n/g, '\n');
	// parse lines
	code = getSplittedLines(code);
	// get config
	let res = getCompilerConfig(code);
	let config = res.config;
	if (!config.noLines) config.noLines = false;
	code = res.code;
	// check variables
	code = checkForVariables(code);
	// Check out;-s
	code = checkForLog(code);
	// Check statements
	code = checkForStatements(code);
	// Check loops
	code = checkForLoops(code);
	// return everything compiled as valid js.
	code = arrayToString(code, !config.noLines);
	return code;
}

export default handleCode;
