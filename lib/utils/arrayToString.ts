function arrayToString(input: Array<string>, useMultipleLines: boolean, seperator: string = ''): string {
	let output = '';
	input.forEach(el => {
		output += el;
		output += seperator;
		if (useMultipleLines) output += '\n';
	});

	return output;
}

export default arrayToString;
