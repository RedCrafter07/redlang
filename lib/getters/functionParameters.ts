function getFunctionParameters(funcLine: string, funcName: string): any {
	let params: any = [];
	if (!funcLine.includes(funcName)) return params;

	let paramString = funcLine.slice(funcName.length).split(';')[1].trim();
	params = paramString.split(',').map(param => param.trim());

	return params;
}

export default getFunctionParameters;
