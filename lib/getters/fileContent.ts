import fs from 'fs';

export default function getFileContent(file: string, directory: string) {
	let code = fs.readFileSync(`${directory}/${file}`, 'utf8');
	return code;
}
