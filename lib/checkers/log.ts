import getFunctionParameters from '../getters/functionParameters';
import { addHandledLine } from '../getters/handledLines';

function checkForLog(lines: Array<string>) {
	lines.forEach((line, index) => {
		if (!line.startsWith('#')) {
			if (line.startsWith('out')) {
				let arr = getFunctionParameters(line, 'out');
				if (arr.length > 1) {
					throw new Error('out function can only have one parameter');
				} else if (arr.length == 1) {
					lines[index] = `console.log(${arr[0]});`;
				} else {
					lines[index] = `console.log();`;
				}

				addHandledLine(index);
			}
		}
	});

	return lines;
}

export default checkForLog;
