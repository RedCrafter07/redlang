import checkForLog from './checkers/log';
import checkForVariables from './checkers/variables';
import checkForStatements from './checkers/statements';
import getSplittedLines from './getters/getSplittedLines';
import arrayToString from './utils/arrayToString';
import getCompilerConfig from './getters/getCompilerConfig';
import checkForLoops from './checkers/loops';
import filterUnhandledLines from './utils/filterUnhandledLines';

async function handleCode(code: any) {
	code = code.replace(/\r\n/g, '\n');
	// parse lines
	code = await getSplittedLines(code);
	// get config
	let res = await getCompilerConfig(code);
	let config = res.config;
	if (!config.noLines) config.noLines = false;
	code = res.code;
	// check variables
	code = await checkForVariables(code);
	// Check out;-s
	code = await checkForLog(code);
	// Check statements
	code = await checkForStatements(code);
	// Check loops
	code = await checkForLoops(code);
	// filter unhandled lines
	code = await filterUnhandledLines(code);
	// make string from array of lines and check for config.noLines
	code = await arrayToString(code, !config.noLines);
	return { code, config };
}

export default handleCode;
