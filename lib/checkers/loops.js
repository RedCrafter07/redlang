"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkForLoops(lines) {
    let nextLineIsLoop = false;
    lines.forEach((line, index) => {
        if (!line.startsWith('#')) {
            //checking if line includes an statement
            if (nextLineIsLoop == true) {
                if (line.startsWith('$')) {
                    lines[index] = '}';
                    nextLineIsLoop = false;
                }
            }
            if (line.startsWith('&')) {
                //checking for if statement type (normal, else if, else)
                if (line.startsWith('&4 ')) {
                    let statement = line.slice('&4 '.length).split(':')[0].trim().replace(',,', ';');
                    let varName = statement.split(' ')[0];
                    lines[index] = `for (let ${varName} = 0; ${statement}) {`;
                    nextLineIsLoop = true;
                }
                else if (line.startsWith('&& ')) {
                    let statement = line.slice('&& '.length).split(':')[0].trim();
                    let varName = statement.split(' ')[0];
                    lines[index] = `while (${statement}) {`;
                    nextLineIsLoop = true;
                }
                else {
                    throw new Error('Error while compiling loop: No valid statement provided!\n' + line);
                }
            }
        }
    });
    return lines;
}
exports.default = checkForLoops;
