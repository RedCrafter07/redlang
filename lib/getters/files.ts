import handleCode from '../handleCode';
import fs from 'fs';

async function checkForFiles(directory: string) {
	fs.readdirSync(directory).forEach(async file => {
		if (file.endsWith('.rlang')) {
			let code = fs.readFileSync(`${directory}/${file}`, 'utf8');
			// handling the code
			let out = await handleCode(code);
			//
			let jsFile = fs.writeFileSync(`${directory}/${file}.js`, out.code, 'utf8');
		}
	});
}

export default checkForFiles;
