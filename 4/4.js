var md5 = require('md5');

// Stupid bruteforce solution :)

var input = 'yzbqklnj';

function checkmd5(input) {
    return md5(input).substring(0,5) === '00000';
}

function checkmd52(input) {
    return md5(input).substring(0,6) === '000000';
}

if (checkmd5(input)) {
    console.log(input);
}

var i = 0;
while (!checkmd5(input + '' + i)) {
    i++;
}

console.log(input + '' + i);
console.log(md5(input + '' + i));

// Second scenario
if (checkmd52(input)) {
    console.log(input);
}

var i = 0;
while (!checkmd52(input + '' + i)) {
    i++;
}

console.log(input + '' + i);
console.log(md5(input + '' + i));
