function variableToOutput(variable: { name: string; constant: boolean; value: string }): string {
	const { name, constant, value } = variable;
	let pref = constant ? 'const' : 'let';
	return `${pref} ${name} = ${value};`;
}

export default variableToOutput;
