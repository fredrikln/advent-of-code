var fs = require('fs');

var input = fs.readFileSync('input.txt', 'utf8');

input = JSON.parse(input);

function sum(input) {
    if (typeof input == 'string') return 0;

    if (typeof input == 'number') return input;

    var theSum = 0;

    for (var i in input) {
        if (i == 'red') theSum += 0;
        else theSum += sum(input[i]);
    }

    return theSum;
}

var sum = sum(input);

console.log(sum);

