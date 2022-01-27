import handleCode from '../handleCode';
import fs from 'fs';

function checkForFiles(directory: string) {
	fs.readdirSync(directory).forEach(file => {
		if (file.endsWith('.rlang')) {
			let code = fs.readFileSync(directory + '/' + file, 'utf8');
			// handling the code
			let out = handleCode(code);
			eval(out.code);
		}
	});
}

export default checkForFiles;
