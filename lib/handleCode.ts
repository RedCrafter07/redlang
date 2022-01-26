import checkForLog from './checkers/log';
import checkForVariables from './checkers/variables';
import checkForStatements from './checkers/statements';

function handleCode(code: string) {
	code = code.replace(/\r\n/g, '\n');
	code = checkForVariables(code);
	// console.log(code);
	code = checkForLog(code);
	// console.log(code);
	code = checkForStatements(code);
	return code;
}

export default handleCode;
