export default function getSplittedLines(input: string): Array<string> {
	let lines: Array<string> = input.split('\n'); // split the code into lines

	lines = lines.map(line => line.trim());

	lines.forEach((line: string) => {
		if (line.startsWith('#')) {
			lines.splice(lines.indexOf(line), 1);
		}
	});

	return lines;
}
