var fs = require('fs');

var input = fs.readFileSync('input.txt', 'utf8').split('\n');

var data = {};

for (var i in input) {
    if (input[i] === '') continue;

    var row = input[i];
    var matches = row.match(/(.*) would (gain|lose) ([0-9]+) happiness units by sitting next to (.*)/);

    var name = matches[1];
    var sign = matches[2] === 'gain' ? 1 : -1;
    var units = parseInt(matches[3], 10);
    var nextTo = matches[4];

    if (!data[name]) data[name] = {};

    data[name][nextTo] = sign*units;
}

console.log(data);
