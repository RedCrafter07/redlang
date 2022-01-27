export default checkForVariables;

import getVariableFromString from '../getters/variableFromString';
import variableToOutput from '../outputs/variableToOutput';
import arrayToString from '../utils/arrayToString';

function checkForVariables(lines: Array<string>) {
	lines.forEach((line, index) => {
		if (!line.startsWith('#')) {
			if (line.includes('§')) {
				let { name, constant, value } = getVariableFromString(line);

				let variableString = variableToOutput({ name, constant, value });

				lines[index] = variableString;
			}

			// if (variables.includes(variable)) {
			// 	throw new Error('Variable ' + variable + ' is defined multiple times!');
			// }}
		}
	});

	return lines;
}
