import arrayToString from '../utils/arrayToString';
import getFunctionParameters from '../getters/functionParameters';

function checkForLog(input: string): string {
	let lines = input.split('\n');
	lines.forEach((line, index) => {
		if (line.includes('out')) {
			let arr = getFunctionParameters(line, 'out');
			if (arr.length > 1) {
				throw new Error('out function can only have one parameter');
			} else if (arr.length == 1) {
				lines[index] = `console.log(${arr[0]});`;
			} else {
				lines[index] = `console.log();`;
			}
		}
	});

	return arrayToString(lines, true);
}

export default checkForLog;
