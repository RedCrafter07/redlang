let handledLines: Array<number> = [];

export default function getHandledLines() {
	return handledLines;
}

export function addHandledLine(lineIndex: number): void {
	if (handledLines.includes(lineIndex)) return;
	handledLines.push(lineIndex);
}
