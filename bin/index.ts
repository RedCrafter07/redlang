#!/usr/bin/env node

/*             _                 __ _             ___ _____   _
  _ __ ___  __| | ___ _ __ __ _ / _| |_ ___ _ __ / _ \___  |_| | ___        
 | '__/ _ \/ _` |/ __| '__/ _` | |_| __/ _ \ '__| | | | / / _` |/ _ \       
 | | |  __/ (_| | (__| | | (_| |  _| ||  __/ |  | |_| |/ / (_| |  __/       
 |_|  \___|\__,_|\___|_|  \__,_|_|  \__\___|_|   \___//_(_)__,_|\___|       
*/

import { argv } from 'process';
import commandLineArgs from 'command-line-args';
import compile from './lib/compile';
import defaultScreen from './lib/defaultScreen';

(async () => {
	let args = [
		{ name: 'compile', alias: 'c', type: Boolean, multiple: false },
		{ name: 'watch', alias: 'w', type: Boolean, multiple: false },
		{ name: 'xlart', alias: 'x', type: Boolean, multiple: false },
		{ name: 'file', alias: 'f', type: String, multiple: true },
		{ name: 'all', alias: 'a', type: Boolean, multiple: false }
	];

	let options = commandLineArgs(args, { argv });

	let font: any = options.xlart ? 'Alpha' : '3-D';

	if (options.compile) {
		await compile(font, options);
		return;
	}

	await defaultScreen(font);
})();
