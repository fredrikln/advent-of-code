var fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var i = 0;

var sqFt = 0;
var ribbonLength = 0;

for(i in lines) {
    var line = lines[i];

    if (line === '') continue;

    var dimensions = line.split('x').map(function (a) {
        return parseInt(a, 10);
    }).sort(function (a, b) {
        return (a > b ? -1 : 1);
    });

    var twoSmallest = findTwoSmallest(dimensions);

    sqFt += (dimensions[0]*dimensions[1]*2) + (dimensions[1]*dimensions[2]*2) + (dimensions[0]*dimensions[2]*2);
    sqFt += (twoSmallest[0] * twoSmallest[1]);

    ribbonLength += twoSmallest.reduce(function (prev, current) {
        return prev + current*2;
    }, 0) + dimensions.reduce(function (prev, current) {
        return prev * current;
    });
}

console.log('Total square feet of wrapping paper needed: ' + sqFt);
console.log('Total feet of ribbon needed: ' + ribbonLength);

function findTwoSmallest(input) {
    var output = [input[0], input[1]];

    if (input[2] < output[0]) {
        output[0] = input[2];
    }
    else if (input[2] < output[1]) {
        output[1] = input[2];
    }

    return output;
}
