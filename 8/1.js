var fs = require('fs');

var input = fs.readFileSync('input.txt', 'utf8').split("\n");

var inCharsTotal = 0;
var outCharsTotal = 0;

for (var i in input) {
    var line = input[i];

    if (line === '') continue;

    var inChars = line.length;
    inCharsTotal += inChars;

    var cleanLine = line.substring(1, line.length-1);

    cleanLine = cleanLine.replace(/\\"/g, ".").replace(/\\\\/g, ".").replace(/\\x[a-f0-9]{2}/g, '.');

    var outChars = cleanLine.length;
    outCharsTotal += outChars;

    console.log(line, cleanLine, inChars, outChars);
}

console.log(inCharsTotal, outCharsTotal, inCharsTotal - outCharsTotal);
