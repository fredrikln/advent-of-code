var fs = require('fs');

fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) throw err;

    var floor = 0;
    var firstBasement = null;

    for (var i = 0; i < data.length; i++) {
        var instruction = data[i];

        switch (instruction) {
            case '(':
                floor++;
                break;
            case ')':
                floor--;
                break;
        }

        if (floor == -1 && firstBasement === null) {
            firstBasement = (i+1);
        }
    }

    console.log('Santa ended up on floor: ' + floor);
    console.log('Santa first went into the basement on instruction: ' + firstBasement);
});
