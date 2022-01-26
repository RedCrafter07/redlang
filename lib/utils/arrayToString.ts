function arrayToString(input: Array<string>, useMultipleLines: boolean): string {
	let output = '';
	input.forEach(el => {
		output += el;
		if (useMultipleLines) output += '\n';
	});

	return output;
}

export default arrayToString;
