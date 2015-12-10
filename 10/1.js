var input = '1113122113';
var repetitions = 50; // challenge 1 = 40, challenge 2 = 50

var output = '';
var current = input[0];
var count = 0;

//console.log(input);

for (var j = 0; j < repetitions; j++) {
    for (var i = 0; i < input.length; i++) {
        var letter = input[i];

        if (current !== letter) {
            output += count + current;

            current = letter;
            count = 0;
        }

        count++;
    }

    output += count + letter;
    count = 0;

    if (j == (repetitions-1)) {
        //process.stdout.write(output);
        console.log(output);
        console.log(output.length);
    }

    input = output;
    output = '';

    current = input[0];
}
