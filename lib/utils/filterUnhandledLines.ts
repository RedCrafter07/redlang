import getHandledLines from '../getters/handledLines';

export default function filterUnhandledLines(input: Array<string>) {
	let handledLines = getHandledLines();
	let lines = input.filter((line, index) => {
		if (handledLines.includes(index)) {
			return true;
		} else {
			return false;
		}
	});

	return lines;
}
