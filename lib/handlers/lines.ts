export default checkLines;

let checkForArr: Array<{ searchFor: string; searchAt: string; callback: Function }> = [];

let lines: Array<string> = [];

function checkLines(code: string) {
	lines = code.split('\n');
	lines.forEach((line: string, index: number) => {
		if (!line.startsWith('#')) {
			checkForArr.forEach((check: { searchFor: string; searchAt: string; callback: Function }) => {
				checkMethod(line, check.searchAt, check.searchFor)
					? check.callback({ line, change: changeLine(index) })
					: null;
			});
		}
	});
}

export const checkFor = function(searchFor: string, searchAt: string, callback: Function) {
	let validSearches = [ 's', 'e', '*' ];
	if (!validSearches.includes(searchAt)) return;

	let data = {
		searchFor: searchFor,
		searchAt: searchAt,
		callback: callback
	};

	checkForArr.push(data);
	return data;
};

function checkMethod(input: string, method: string, value: string): boolean {
	let validSearches = [ 's', 'e', '*' ];
	if (!validSearches.includes(method)) return false;
	let check;
	method == 's'
		? (check = input.startsWith(value))
		: method == 'e' ? (check = input.endsWith(value)) : (check = input.includes(value));

	return check;
}

function changeLine(line: number) {
	return function(changeTo: string) {
		lines[line] = changeTo;
	};
}
