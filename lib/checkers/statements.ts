import arrayToString from '../utils/arrayToString';

export default (lines: Array<string>) => {
	let nextLineIsStatement = false;
	lines.forEach((line, index) => {
		if (!line.startsWith('#')) {
			//checking if line includes an statement
			if (nextLineIsStatement == true) {
				if (line.startsWith('$')) {
					lines[index] = '}';
					nextLineIsStatement = false;
				}
			}
			if (line.startsWith('?')) {
				//checking for if statement type (normal, else if, else)
				if (line.startsWith('? ')) {
					let statement = line.slice('? '.length).split(':')[0];
					lines[index] = `if (${statement}) {`;
					nextLineIsStatement = true;
				} else if (line.startsWith('?x')) {
					lines[index] = 'else {';
					nextLineIsStatement = true;
				} else if (line.startsWith('?& ')) {
					let statement = line.slice('?& '.length).split(':')[0];
					lines[index] = `else if (${statement}) {`;
					nextLineIsStatement = true;
				} else {
					throw new Error('Error while compiling statement: No valid statement provided!\n' + line);
				}
			}
		}
	});

	return lines;
};
