var fs = require('fs');
var santa = require('./santa');

var input = fs.readFileSync('input.txt', 'utf8').trim();

var floor = santa.endsOnFloor(input);
var basement = santa.firstBasement(input);

console.log('Ends up on: ' + floor);
console.log('First enters basement on: ' + basement);
