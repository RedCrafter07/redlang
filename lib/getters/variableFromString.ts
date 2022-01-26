function getVariableFromString(
	input: string
): {
	name: string;
	constant: boolean;
	value: string;
} {
	let variable = input.split('§')[1];
	let constant = variable.includes('?');
	let name = variable.split(':')[0].trim();
	constant ? (name = name.split('?')[0]) : name;
	let value = variable.split(':')[1].trim();
	return {
		name: name,
		constant: constant,
		value: value
	};
}

export default getVariableFromString;
