import { addHandledLine } from '../getters/handledLines';

export default function checkForImports(lines: Array<string>, options: any) {
	lines.forEach((line, index) => {
		if (line.includes('->')) {
			let parts = line.split('->').map(part => part.trim());
			let name = parts[0];
			let path = parts[1];
			let useImport = options.useImport || false;

			addHandledLine(index);

			lines[index] = useImport == true ? `import ${name} from ${path};` : `const ${name} = require(${path});`;
		}
	});

	return lines;
}
