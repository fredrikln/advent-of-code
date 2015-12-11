function increment(input) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';

    var didWrap = false;

    var output = '';

    for (var i = input.length-1; i >= 0; i--) {
        var letter = input[i];

        if (didWrap) {
            var nextLetter = letters[letters.indexOf(letter)+1];

            if (typeof nextLetter === 'undefined') {
                output = 'a' + output;
                didWrap = true;

                if (i == 0) {
                    output = 'a' + output;
                }
            }
            else {
                output = nextLetter + output;
                didWrap = false;
            }
        }
        else {
            if (i == input.length-1) {
                var nextLetter = letters[letters.indexOf(letter)+1];

                if (typeof nextLetter == 'undefined') {
                    output = 'a' + output;
                    didWrap = true;

                    if (i == 0) {
                        output = 'a' + output;
                    }
                }
                else {
                    output = letters[letters.indexOf(letter)+1] + output;
                    didWrap = false;
                }
            }
            else {
                output = letter + output;
                didWrap = false;
            }

        }
    }

    return output;
}

function hasIncreasing(input) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < input.length - 2; i++) {
        var slice = input.slice(i, i+3);
        for (var j = 0; j < letters.length - 2; j++) {
            var valid = letters.slice(j, j+3);

            if (valid == slice) {
                return true;
            }
        }
    }

    return false;
}

function hasInvalidCharacters(input) {
    return input.indexOf('i') > -1 || input.indexOf('o') > -1 || input.indexOf('l') > -1;
}

function hasDoubleDouble(input) {
    var taken = [];
    for (var i = 0; i < input.length - 1; i++) {
        if (input[i] == input[i+1] && taken.indexOf(input[i]) == -1) {
            taken.push(input[i]);
        }
    }

    if (taken.length >= 2) {
        return true;
    }

    return false;
}

//var input = 'hepxcrrq'; // first
var input = 'hepxxyzz'; // second
for (var i = 0; i < 1000000; i++) {
    input = increment(input);

    if (hasIncreasing(input) && !hasInvalidCharacters(input) && hasDoubleDouble(input)) {
        console.log(input, 'valid');
        break;
    }
}

var input = 'abcd';
hasIncreasing(input);
