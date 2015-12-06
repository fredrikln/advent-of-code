var fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var vowels = ['a', 'e', 'i', 'o', 'u'];
var dirtyList = ['ab', 'cd', 'pq', 'xy'];

var wordCount = 0;

for(var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Needs 3 vowels
    if (countVowels(line) < 3) continue;

    // Has to contain a repeating letter
    if (!containsDuplicate(line)) continue;

    // Can't contain dirty words
    if (containsDirty(line)) continue;

    wordCount++;

    //console.log(line);
}

console.log(wordCount);

function checkVowel(letter) {
    for (var i = 0; i < vowels.length; i++) {
        if (letter === vowels[i]) return true;
    }

    return false;
}

function countVowels(line) {
    var vowelCount = 0;
    for (var j = 0; j < line.length; j++) {
        if (checkVowel(line[j])) {
            vowelCount++;
        }
    }

    return vowelCount;
}

function containsDuplicate(line) {
    var last = line[0];

    for (var i = 1; i < line.length; i++) {
        if (line[i] === last) {
            return true;
        }

        last = line[i];
    }

    return false;
}

function containsDirty(line) {
    for (var i = 0; i < line.length-1; i++) {
        for (var j = 0; j < dirtyList.length; j++) {

            if (line.substring(i,i+2) === dirtyList[j]) {
                return true;
            }
        }
    }

    return false;
}
