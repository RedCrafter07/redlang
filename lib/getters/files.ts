import handleCode from '../handleCode';
import fs from 'fs';
import getFileContent from './fileContent';

async function checkForFiles(directory: string) {
	fs.readdirSync(directory).forEach(async file => {
		if (file.endsWith('.rlang')) {
			let code = await getFileContent(file, directory);
			// handling the code
			let out = await handleCode(code);
			//
			let jsFile = fs.writeFileSync(`${directory}/${file}.js`, out.code, 'utf8');
		}
	});
}

export default checkForFiles;
