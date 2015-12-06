var md5 = require('md5');

// Stupid bruteforce solution :)

var input = 'yzbqklnj';


function checkMd5(input, length) {
    return md5(input).substring(0, length) === Array(length+1).join('0');
}

if (checkMd5(input, 5)) {
    console.log(input);
}

var i = 0;
while (!checkMd5(input + '' + i, 5)) {
    i++;
}

console.log(i);
console.log(md5(input + '' + i));


// Second scenario
if (checkMd5(input, 6)) {
    console.log(input);
}

var i = 0;
while (!checkMd5(input + '' + i, 6)) {
    i++;
}

console.log(i);
console.log(md5(input + '' + i));
