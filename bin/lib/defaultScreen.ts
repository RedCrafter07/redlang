import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import open from 'open';
import compile from './compile';
import createNewProject from './default/new';

export default async function defaultScreen(font: any) {
	console.clear();
	console.log(
		gradient('#77ff77', '#ffdd77', '#ff3434')(
			figlet.textSync('Red Lang'.toUpperCase(), {
				font
			})
		)
	);
	console.log(gradient.atlas('Welcome to RedLang!'));
	let menu = await inquirer.prompt([
		{
			type: 'list',
			choices: [
				{
					name: 'Exit',
					value: 'exit'
				},
				{
					name: 'Compile files',
					value: 'compile'
				},
				{
					name: 'Create new project',
					value: 'new'
				},
				{
					name: 'Show repo',
					value: 'repo'
				},
				{
					name: 'Show wiki',
					value: 'wiki'
				}
			],
			message: 'What do you want to do?',
			name: 'menu',
			default: 'exit'
		}
	]);

	switch (menu.menu) {
		case 'exit':
			process.exit(0);
			break;
		case 'repo':
			await open('https://github.com/redcrafter07/redlang', { wait: false });
			console.log(chalk.yellow('Look in your browser!'));
			break;
		case 'compile':
			await compile(font, { all: true });
			break;
		case 'new':
			await createNewProject();
			break;
		case 'wiki':
			await open('https://github.com/RedCrafter07/redlang/wiki');
			console.log(chalk.yellow('Look in your browser!'));
			break;
	}
}
