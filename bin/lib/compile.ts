import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import fs from 'fs';
import { cwd } from 'process';
import getFileContent from '../../lib/getters/fileContent';
import arrayToString from '../../lib/utils/arrayToString';
import handleCode from '../../lib/handleCode';

export default async function compile(font: any, options: any) {
	console.log(
		gradient('#ff3434', '#ff0000')(figlet.textSync('COMPILER', { horizontalLayout: 'full', font: font })) +
			'\n' +
			gradient('#00ff00', '#77ff77')('RedLang Code-Compiler')
	);

	if ((options.file == [] || !options.file) && !options.all) {
		console.log(chalk.red('Please provide a file to compile'));
		return;
	}

	let files = options.file;

	if (options.all) {
		files = fs.readdirSync(cwd()).filter(file => file.endsWith('.rlang'));
		console.log(chalk.yellow('Compiling files with extension .rlang in current directory!'));
	}

	files = files.map((file: any) => file.replace('/', '\\'));

	if (!options.all) {
		console.log(chalk.yellow(`Compiling files ${arrayToString(files, false, ', ').slice(0, -2)}...`));

		console.log(chalk.greenBright('[INFO]: If you want to include new files, restart the command.'));
	}

	files.forEach(async (file: any) => {
		compileFile(`${cwd()}\\${file}`);
	});

	if (options.watch) {
		if (options.all) console.log(chalk.yellow('Watching file extensions .rlang in current directory!'));
		else console.log(chalk.yellow(`Watching files ${arrayToString(files, false, ', ').slice(0, -2)}...`));
		fs
			.watch(cwd(), {
				recursive: true
			})
			.addListener('change', async (eventType: any, file: any) => {
				if (!file.endsWith('.rlang')) {
					return;
				}

				if (!options.all) {
					if (!files.includes(file)) {
						return;
					}
				}

				let fileName = file.split('\\').pop();

				let spinner = createSpinner(`Recompiling file '${fileName}'...`);

				spinner.start();

				await compileFile(`${cwd()}\\${file}`);

				spinner.success({ text: `File '${fileName}' recompiled!` });
			});
	}

	async function compileFile(path: string) {
		let splitted = path.split('\\');
		let file = splitted[splitted.length - 1];
		let dir = arrayToString(splitted.slice(0, -1), false, '\\');
		let content;
		try {
			content = await getFileContent(file, dir);
		} catch (e) {
			return;
		}
		let out = await handleCode(content);
		fs.writeFileSync(`${dir}\\${file}.js`, out.code, 'utf8');
	}
}
