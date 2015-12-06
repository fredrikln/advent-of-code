var fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var lineCount = 0;

for(var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (!hasRepeatingLetter(line)) continue;
    if (!containsPair(line)) continue;

    lineCount++;

    console.log(line);
}

console.log(lineCount);

function containsPair(line) {
    for (var i = 0; i < line.length; i++) {
        if (line.indexOf(line.substring(i, i+2), i+2) !== -1) {
            return true;
        }
    }

    return false;
}

function hasRepeatingLetter(line) {
    for (var i = 2; i < line.length; i++) {
        if (line[i-2] == line[i]) {
            return true;
        }
    }

    return false;
}
