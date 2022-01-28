import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import open from 'open';
import fs from 'fs';
import { execSync } from 'child_process';
import { cwd } from 'process';
import compile from '../compile';

let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function createNewProject() {
	let answers = await inquirer.prompt([
		{
			message: "What's the name of your project?",
			name: 'name',
			type: 'input'
		},
		{
			type: 'input',
			name: 'desc',
			message: "What's your project's description?"
		},
		{
			type: 'input',
			name: 'author',
			message: "Who's the author of your project?"
		},
		{
			type: 'input',
			name: 'packages',
			message: 'What packages do you want to install? (separate with space)'
		},
		{
			type: 'list',
			name: 'open',
			message: 'Open project after creation? (VSCode Only)',
			choices: [
				{
					name: 'No',
					value: false
				},
				{
					name: 'Yes',
					value: true
				}
			]
		}
	]);

	let creatingSpinner = createSpinner(`Creating project...`);

	creatingSpinner.start();

	await sleep(1000);

	let spinner = createSpinner(`Creating directory...`);

	try {
		fs.mkdirSync(`./${answers.name}`);
	} catch (e) {
		spinner.error({
			text:
				"Failed to create directory! If there's already an directory named " +
				answers.name +
				', you can ignore this message.'
		});
	}

	spinner.success({
		text: 'Created directory!'
	});

	spinner = createSpinner(`Creating package.json...`);

	try {
		execSync(`npm init -y`, { cwd: `${cwd()}\\..\\${answers.name}` });
	} catch (e) {
		spinner.error({
			text: 'Failed to create package.json!'
		});

		creatingSpinner.error({
			text: 'Failed at creating package.json!'
		});
		return;
	}

	spinner.success({
		text: 'Created package.json!'
	});

	spinner = createSpinner('Updating package.json information...');
	spinner.start();

	let json = await JSON.parse(fs.readFileSync(`${cwd()}\\..\\${answers.name}\\package.json`, 'utf8'));

	json.description = answers.desc;
	json.author = answers.author;

	try {
		fs.writeFileSync(`${cwd()}\\..\\${answers.name}\\package.json`, JSON.stringify(json, null, 2));
	} catch (e) {
		spinner.error({
			text: 'Failed to update package.json!'
		});

		creatingSpinner.error({
			text: 'Failed at updating package.json!'
		});
		return;
	}

	spinner.success({
		text: 'Updated package.json!'
	});

	if (answers.packages != '') {
		spinner = createSpinner('Installing packages...');
		spinner.start();

		try {
			execSync(`npm install ${answers.packages}`, { cwd: `${cwd()}\\..\\${answers.name}` });
		} catch (e) {
			spinner.error({
				text: 'Failed to install packages!'
			});

			creatingSpinner.error({
				text: 'Failed at installing packages!'
			});
			return;
		}

		spinner.success({
			text: 'Installed packages!'
		});
	}

	spinner = createSpinner('Creating index.rlang...');
	spinner.start();

	fs.writeFileSync(`${cwd()}\\..\\${answers.name}\\index.rlang`, 'out; "Hello World!"');

	spinner.success({
		text: 'Created index.rlang!'
	});

	if (answers.open == true) {
		spinner = createSpinner('Opening project...');
		spinner.start();

		try {
			execSync(`code ${cwd()}\\..\\${answers.name}`);
		} catch (e) {}

		spinner.success({
			text: 'Project opened successfully!'
		});
	}

	creatingSpinner.success({ text: `Project '${answers.name}' created successfully!` });

	await sleep(5000);
}
