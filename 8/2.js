var fs = require('fs');

var input = fs.readFileSync('input.txt', 'utf8').split("\n");

var inCharsTotal = 0;
var outCharsTotal = 0;

for (var i in input) {
    var line = input[i];

    if (line === '') continue;

    var inChars = line.length;
    inCharsTotal += inChars;

    cleanLine = line
        .replace(/\\\\/g, '....')
        .replace(/\\"/g, '....')
        .replace(/\"/g, '..')
        .replace(/\\x[0-9a-f]{2}/g, '.....');


    cleanLine = '"' + cleanLine + '"';

    var outChars = cleanLine.length;
    outCharsTotal += outChars;

    console.log(line, cleanLine, inChars, outChars);
    //console.log(cleanLine);
}

console.log(outCharsTotal, inCharsTotal, outCharsTotal - inCharsTotal);
