import arrayToString from '../utils/arrayToString';

export default function getCompilerConfig(lines: Array<string>): { config: any; code: Array<string> } {
	lines = lines.map(line => line.trim());

	let searchForCompiler = false;

	let firstLine = lines[0];
	if (firstLine == '%comp%') {
		searchForCompiler = true;
	}

	let compilerOptions: Array<string> = getLines(
		lines,
		getAllIndexes(lines, '%comp%')[0] + 1,
		getAllIndexes(lines, '%comp%')[1] - 1
	);

	compilerOptions = compilerOptions.map(opt => {
		let splitted = opt.split(':');
		let name = splitted[0].trim();
		let val = splitted[1].trim();

		return `"${name}": ${val}`;
	});

	let compilerString: string = arrayToString(compilerOptions, false);
	let compilerData = JSON.parse(`{${compilerString}}`);

	//remove compiler options
	lines.splice(
		getAllIndexes(lines, '%comp%')[0],
		getDifference(getAllIndexes(lines, '%comp%')[0], getAllIndexes(lines, '%comp%')[1]) + 1
	);

	return { config: compilerData, code: lines };
}

function getAllIndexes(arr: Array<string>, val: string) {
	var indexes = [],
		i = -1;
	while ((i = arr.indexOf(val, i + 1)) != -1) {
		indexes.push(i);
	}
	return indexes;
}

function getLines(arr: Array<string>, startIndex: number, endIndex: number) {
	let lines: Array<string> = [];
	for (let i = startIndex; i <= endIndex; i++) {
		lines.push(arr[i]);
	}
	return lines;
}

function getDifference(a: number, b: number) {
	return Math.abs(a - b);
}
